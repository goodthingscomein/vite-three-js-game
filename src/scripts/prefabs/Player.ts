import { BoxBufferGeometry, MeshStandardMaterial, ColorRepresentation, Vector3, Euler } from 'three';
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
  };

  /** Create the target pos + rot */
  const moveSpeed = 5;
  let targetPosition = new Vector3(0, 1, 0);
  let targetRotation = new Euler(0, 0, 0);

  /** Create the player input object */
  const playerInput = new PlayerInput();
  /** Setup the player input actions */
  // Keys Pressed
  playerInput._WPressed = () => (keysPressed.W = true);
  playerInput._APressed = () => (keysPressed.A = true);
  playerInput._SPressed = () => (keysPressed.S = true);
  playerInput._DPressed = () => (keysPressed.D = true);
  // Keys Released
  playerInput._WReleased = () => (keysPressed.W = false);
  playerInput._AReleased = () => (keysPressed.A = false);
  playerInput._SReleased = () => (keysPressed.S = false);
  playerInput._DReleased = () => (keysPressed.D = false);

  /** Player Loop */
  player._Tick = (deltaTime: number) => {
    if (keysPressed.W) targetPosition.add(new Vector3(0, 0, moveSpeed * deltaTime));
    if (keysPressed.S) targetPosition.add(new Vector3(0, 0, -moveSpeed * deltaTime));
    if (keysPressed.A) targetPosition.add(new Vector3(moveSpeed * deltaTime, 0, 0));
    if (keysPressed.D) targetPosition.add(new Vector3(-moveSpeed * deltaTime, 0, 0));
    player._mesh.position.copy(targetPosition);
  };

  return player;
}

export { CreatePlayer };
