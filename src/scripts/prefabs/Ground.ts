import { PlaneBufferGeometry, MeshStandardMaterial, Mesh, MathUtils } from 'three';

function CreateGround() {
  const geometry = new PlaneBufferGeometry(100, 100);
  const material = new MeshStandardMaterial();
  const ground = new Mesh(geometry, material);
  ground.rotateX(-MathUtils.degToRad(90));
  ground.receiveShadow = true;

  return ground;
}

export { CreateGround };
