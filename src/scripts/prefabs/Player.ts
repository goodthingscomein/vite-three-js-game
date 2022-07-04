import { BoxBufferGeometry, MeshStandardMaterial, ColorRepresentation, Euler } from 'three';
import { MeshObject } from '../components/MeshObject';
import { PlayerInput } from '../systems/PlayerInput';

function CreatePlayer(color: ColorRepresentation) {
  /** Create the player model */
  const geometry = new BoxBufferGeometry(1, 2, 1);
  const material = new MeshStandardMaterial({ color });
  const player = new MeshObject(geometry, material);
  player._mesh.position.setY(1);
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

  /** GPointer Lock */
  let mouseLocked = false;
  const canvas = document.querySelector<HTMLCanvasElement>('#c')!;
  canvas.requestPointerLock = canvas.requestPointerLock;
  document.exitPointerLock = document.exitPointerLock;

  /** Create the target pos + rot */
  const moveSpeed = 5;
  let targetRotation = new Euler(0, 0, 0);

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
  playerInput._MMBReleased = () => {
    mousePressed.MMB = false;
    keysPressed.W = false;
  };
  // Mouse Movement
  playerInput._MouseMove = (e) => {
    console.log(e.movementX);
    mouseChanged.x = e.movementX;
    mouseChanged.y = e.movementY;
  };

  /** Player Loop */
  player._Tick = (deltaTime: number) => {
    /** Calculate movement */
    if (keysPressed.W) player._mesh.translateZ(moveSpeed * deltaTime);
    if (keysPressed.S) player._mesh.translateZ(-moveSpeed * deltaTime);
    if (keysPressed.A) player._mesh.translateX(moveSpeed * deltaTime);
    if (keysPressed.D) player._mesh.translateX(-moveSpeed * deltaTime);

    /** Calculate rotation */
    mousePressed.MMB || mousePressed.RMB ? canvas.requestPointerLock() : document.exitPointerLock();
    document.pointerLockElement === canvas ? (mouseLocked = true) : (mouseLocked = false);
    if (mouseLocked) {
      targetRotation.y -= mouseChanged.x * 0.05 * deltaTime;
      if (mousePressed.MMB) keysPressed.W = true;
    }
    player._mesh.rotation.copy(targetRotation);
  };

  return player;
}

export { CreatePlayer };
