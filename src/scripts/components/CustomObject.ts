import { BufferGeometry, Mesh, Material } from 'three';
import { Updatable } from './Updatable';

class CustomObject extends Updatable {
  _mesh: Mesh;

  constructor(geometry: BufferGeometry, material: Material) {
    super();
    this._mesh = new Mesh(geometry, material);
  }
}

export { CustomObject };
