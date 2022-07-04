import { BoxBufferGeometry, Mesh, MeshStandardMaterial, ColorRepresentation } from 'three';

function CreateCube(color: ColorRepresentation) {
  /** Create a Cube geometry */
  const geometry = new BoxBufferGeometry(2, 2, 2);

  /** Create a material */
  const material = new MeshStandardMaterial({ color });

  /** Create the cube */
  const cube = new Mesh(geometry, material);
  return cube;
}

export { CreateCube };
