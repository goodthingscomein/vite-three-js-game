import { Vector3, Euler, Object3D, Group } from 'three';
import { Updatable } from './Updatable';
import { AnimatedModelLoader } from '../systems/AnimatedModelLoader';

class CustomObject extends Updatable {
  _mesh: Group;

  constructor(modelPath: string, modelFile: string, position: Vector3, rotation: Euler, onLoadCallback: () => void) {
    const transform = new Object3D();
    transform.position.copy(position);
    transform.rotation.copy(rotation);
    super(transform);
    this._mesh = new Group();
    const aml = new AnimatedModelLoader(modelPath, modelFile);
    aml._OnLoadComplete = () => {
      if (!aml._model) {
        console.log('Model cannot load');
        return;
      }
      this._mesh = aml._model;
      this._mesh.position.copy(position);
      this._mesh.rotation.copy(rotation);

      onLoadCallback(); // Can only use a custom object once this has been called
    };
  }
}

export { CustomObject };
