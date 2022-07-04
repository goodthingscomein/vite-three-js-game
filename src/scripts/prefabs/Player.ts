import { BoxBufferGeometry, MeshStandardMaterial, ColorRepresentation } from 'three';
import { MeshObject } from '../components/MeshObject';

function CreatePlayer(color: ColorRepresentation) {
  const geometry = new BoxBufferGeometry(1, 2, 1);
  const material = new MeshStandardMaterial({ color });
  const player = new MeshObject(geometry, material);
  player._mesh.position.setY(1);
  player._mesh.castShadow = true;

  player._Tick = (deltaTime: number) => {
    player._mesh.rotateY(0.2 * deltaTime);
  };

  return player;
}

export { CreatePlayer };
