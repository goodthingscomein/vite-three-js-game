import { BoxBufferGeometry, MeshStandardMaterial, ColorRepresentation } from 'three';
import { MeshObject } from '../components/MeshObject';

function CreateCube(color: ColorRepresentation) {
  const geometry = new BoxBufferGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color });
  const cube = new MeshObject(geometry, material);

  cube._Tick = (deltaTime: number) => {
    cube._mesh.rotateX(0.5 * deltaTime);
    cube._mesh.rotateY(0.2 * deltaTime);
    cube._mesh.rotateZ(1 * deltaTime);
  };

  return cube;
}

export { CreateCube };
