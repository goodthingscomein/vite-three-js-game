import { Euler, Vector3 } from 'three';
import { CustomObject } from '../components/CustomObject';
import { NetworkManager } from '../systems/NetworkManager';
import { PlayerInput } from '../systems/PlayerInput';

class Player extends CustomObject {
  _controllable: boolean;
  _playerName: string;
  _playerClass: string;

  constructor(
    onLoadCallback: () => void,
    position: Vector3,
    rotation: Euler,
    isControllable: boolean,
    playerName: string,
    playerClass: string
  ) {
    super('player', 'player', ['idle', 'run-f', 'run-b', 'run-l', 'run-r'], position, rotation, onLoadCallback);
    this._controllable = isControllable;
    this._playerName = playerName;
    this._playerClass = playerClass;
  }
}

function CreatePlayer(
  networkManager: NetworkManager,
  onLoadCallback: () => void,
  playerName: string,
  playerClass: string,
  startPos: Vector3,
  startRot: Euler
) {
  /** Create the player model */
  const player = new Player(onLoadCallback, startPos, startRot, true, playerName, playerClass);
  console.log('Our player: ' + player._playerName);

  /** Store the player input */
  const keysPressed = {
    W: false,
    S: false,
    A: false,
    D: false,
    SPACE: false,
  };
  const mousePressed = {
    LMB: false,
    RMB: false,
    MMB: false,
  };
  const mouseChanged = {
    x: 0,
    y: 0,
  };

  let movingForward = false;

  /** GPointer Lock */
  let mouseLocked = false;
  const canvas = document.querySelector<HTMLCanvasElement>('#c')!;
  canvas.requestPointerLock = canvas.requestPointerLock;
  document.exitPointerLock = document.exitPointerLock;

  /** Movement variables */
  const moveSpeed = 5;

  /** Create the player input object */
  const playerInput = new PlayerInput();

  /** Setup the player input actions */
  // Keys Pressed
  playerInput._WPressed = () => (keysPressed.W = true);
  playerInput._APressed = () => (keysPressed.A = true);
  playerInput._SPressed = () => (keysPressed.S = true);
  playerInput._DPressed = () => (keysPressed.D = true);
  playerInput._SpacePressed = () => (keysPressed.SPACE = true);
  // Keys Released
  playerInput._WReleased = () => (keysPressed.W = false);
  playerInput._AReleased = () => (keysPressed.A = false);
  playerInput._SReleased = () => (keysPressed.S = false);
  playerInput._DReleased = () => (keysPressed.D = false);
  playerInput._SpaceReleased = () => (keysPressed.SPACE = false);
  // Mouse Button Pressed
  playerInput._LMBPressed = () => (mousePressed.LMB = true);
  playerInput._RMBPressed = () => (mousePressed.RMB = true);
  playerInput._MMBPressed = () => (mousePressed.MMB = true);
  // Mouse Button Released
  playerInput._LMBReleased = () => (mousePressed.LMB = false);
  playerInput._RMBReleased = () => (mousePressed.RMB = false);
  playerInput._MMBReleased = () => (mousePressed.MMB = false);
  // Mouse Movement
  playerInput._MouseMove = (e) => {
    mouseChanged.x = e.movementX;
    mouseChanged.y = e.movementY;
  };

  /** Setup our on animation change listener */
  player._AnimationChanged = (index) => networkManager._SendAnimation(index);

  /** Player Loop */
  player._Tick = (deltaTime) => {
    if (!player._mesh || !player._mixer) return;

    /** Calculate if the player is trying to walk forward */
    if (keysPressed.W || mousePressed.MMB || (mousePressed.LMB && mousePressed.RMB)) movingForward = true;
    else movingForward = false;

    /** Calculate movement */
    if (movingForward) player._targetTransform.translateZ(moveSpeed * deltaTime);
    if (keysPressed.S) player._targetTransform.translateZ(-moveSpeed * deltaTime);
    if (keysPressed.A) player._targetTransform.translateX(moveSpeed * deltaTime);
    if (keysPressed.D) player._targetTransform.translateX(-moveSpeed * deltaTime);
    player._mesh.position.lerp(player._targetTransform.position, 0.3);

    /** Calculate rotation */
    mousePressed.MMB || mousePressed.RMB ? canvas.requestPointerLock() : document.exitPointerLock();
    document.pointerLockElement === canvas ? (mouseLocked = true) : (mouseLocked = false);
    if (mouseLocked) {
      player._targetTransform.rotation.y -= mouseChanged.x * 0.05 * deltaTime;
      mouseChanged.x = 0;
    }
    player._mesh.quaternion.slerp(player._targetTransform.quaternion, 0.35);

    /** Send new transform to the server */
    networkManager._SendTransform(player._mesh.position, player._mesh.rotation);

    /** Calculate animations */
    player._animations[0].play();
    if (keysPressed.A && !keysPressed.D) player._SetAnimation(3); // animate run left
    else if (!keysPressed.A && keysPressed.D) player._SetAnimation(4); // animate run right
    else if (movingForward && !keysPressed.S) player._SetAnimation(1); // animate run forward
    else if (!movingForward && keysPressed.S) player._SetAnimation(2); // animate run back
    else player._SetAnimation(0); // animate idle

    /** Update the animations */
    player._mixer.update(deltaTime);
  };

  return player;
}

function CreateOtherPlayer(
  onLoadCallback: () => void,
  playerName: string,
  playerClass: string,
  startPos: Vector3,
  startRot: Euler
) {
  /** Create the player model */
  const otherPlayer = new Player(onLoadCallback, startPos, startRot, false, playerName, playerClass);

  console.log('other player: ' + otherPlayer._playerName);

  otherPlayer._Tick = (deltaTime) => {
    if (!otherPlayer._mesh) return;
    otherPlayer._mesh.position.lerp(otherPlayer._targetTransform.position, 0.4);
    otherPlayer._mesh.quaternion.slerp(otherPlayer._targetTransform.quaternion, 0.45);

    /** Animate the other player */
    otherPlayer._mixer.update(deltaTime);
  };

  return otherPlayer;
}

export { Player, CreatePlayer, CreateOtherPlayer };
