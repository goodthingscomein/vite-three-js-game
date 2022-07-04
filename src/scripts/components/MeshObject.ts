import { BufferGeometry, BoxBufferGeometry, Mesh, Material, MeshStandardMaterial, ColorRepresentation } from 'three';

class MeshObject {
  _mesh: Mesh;
  constructor(geometry: BufferGeometry, material: Material) {
    this._mesh = new Mesh(geometry, material);
  }

  _Tick() {}
}

function CreateCube(color: ColorRepresentation) {
  const geometry = new BoxBufferGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color });
  const cube = new MeshObject(geometry, material);

  cube._Tick = () => {
    cube._mesh.rotateX(0.01);
    cube._mesh.rotateY(0.004);
    cube._mesh.rotateZ(0.02);
  };

  return cube;
}

export { MeshObject, CreateCube };
