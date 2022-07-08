import { BufferGeometry, Mesh, Material, Vector3, Euler, Object3D } from 'three';
import { Updatable } from './Updatable';

class CustomObject extends Updatable {
  _mesh: Mesh;

  constructor(geometry: BufferGeometry, material: Material, position: Vector3, rotation: Euler) {
    const transform = new Object3D();
    transform.position.copy(position);
    transform.rotation.copy(rotation);
    super(transform);
    this._mesh = new Mesh(geometry, material);
    this._mesh.position.copy(position);
    this._mesh.rotation.copy(rotation);
  }
}

export { CustomObject };
