import type { Object3D } from 'three';
class Updatable {
  _targetTransform: Object3D;

  constructor(transform: Object3D) {
    this._targetTransform = transform;
  }

  _Tick(deltaTime: number, ...args: any) {}
}

export { Updatable };
