import { PlaneBufferGeometry, MeshStandardMaterial, MathUtils } from 'three';
import { MeshObject } from '../components/MeshObject';

function CreateGround() {
  const geometry = new PlaneBufferGeometry(100, 100);
  const material = new MeshStandardMaterial();
  const ground = new MeshObject(geometry, material);
  ground._mesh.rotateX(-MathUtils.degToRad(90));
  ground._mesh.receiveShadow = true;

  return ground;
}

export { CreateGround };
