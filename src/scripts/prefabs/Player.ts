import { BoxBufferGeometry, MeshStandardMaterial, ColorRepresentation, Euler, Vector3, Object3D } from 'three';
import { CustomObject } from '../components/CustomObject';
import { PlayerInput } from '../systems/PlayerInput';

function CreatePlayer(color: ColorRepresentation, startPos: Vector3, startRot: Euler) {
  /** Create the player model */
  const geometry = new BoxBufferGeometry(1, 2, 1);
  const material = new MeshStandardMaterial({ color });
  const player = new CustomObject(geometry, material);
  player._mesh.position.copy(startPos);
  player._mesh.rotation.copy(startRot);
  player._mesh.castShadow = true;

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

  /** Create the target pos + rot */
  let targetTransform = new Object3D();
  targetTransform.position.copy(startPos); // Setup start position
  targetTransform.rotation.copy(startRot); // Setup start rotation

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

  /** Player Loop */
  player._Tick = (deltaTime: number) => {
    /** Calculate if the player is trying to walk forward */
    if (keysPressed.W || mousePressed.MMB || (mousePressed.LMB && mousePressed.RMB)) movingForward = true;
    else movingForward = false;

    /** Calculate movement */
    if (movingForward) targetTransform.translateZ(moveSpeed * deltaTime);
    if (keysPressed.S) targetTransform.translateZ(-moveSpeed * deltaTime);
    if (keysPressed.A) targetTransform.translateX(moveSpeed * deltaTime);
    if (keysPressed.D) targetTransform.translateX(-moveSpeed * deltaTime);
    player._mesh.position.lerp(targetTransform.position, 0.2);

    /** Calculate rotation */
    mousePressed.MMB || mousePressed.RMB ? canvas.requestPointerLock() : document.exitPointerLock();
    document.pointerLockElement === canvas ? (mouseLocked = true) : (mouseLocked = false);
    if (mouseLocked) {
      targetTransform.rotation.y -= mouseChanged.x * 0.05 * deltaTime;
      mouseChanged.x = 0;
    }
    player._mesh.quaternion.slerp(targetTransform.quaternion, 0.35);
  };

  return player;
}

export { CreatePlayer };
