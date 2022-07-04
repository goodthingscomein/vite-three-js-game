import { BufferGeometry, Mesh, Material } from 'three';

class MeshObject {
  _mesh: Mesh;
  constructor(geometry: BufferGeometry, material: Material) {
    this._mesh = new Mesh(geometry, material);
  }

  _Tick(deltaTime: number, ...args: any) {}
}

export { MeshObject };
