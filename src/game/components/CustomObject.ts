import { Vector3, Euler, Object3D, Group, AnimationAction, AnimationMixer } from 'three';
import { Updatable } from './Updatable';
import { AnimatedModelLoader } from '../systems/AnimatedModelLoader';

class CustomObject extends Updatable {
  _mesh: Group;
  _mixer: AnimationMixer;
  _animations: AnimationAction[] = [];
  _activeAnimation: AnimationAction | undefined;
  _lastAnimation: AnimationAction | undefined;

  constructor(
    modelPath: string,
    modelFile: string,
    animationFiles: string[],
    position: Vector3,
    rotation: Euler,
    onLoadCallback: () => void
  ) {
    const transform = new Object3D();
    transform.position.copy(position);
    transform.rotation.copy(rotation);
    super(transform);
    this._mesh = new Group(); // Stub
    this._mixer = new AnimationMixer(new Object3D()); // Stub
    const aml = new AnimatedModelLoader(modelPath, modelFile, animationFiles);
    aml._OnLoadComplete = () => {
      if (!aml._model) return;
      this._mesh = aml._model;
      this._mesh.position.copy(position);
      this._mesh.rotation.copy(rotation);

      if (!aml._mixer) return;
      this._mixer = aml._mixer;
      this._animations = aml._animations;

      onLoadCallback(); // Can only use a custom object once this has been called
    };
  }

  _SetAnimation(index: number) {
    if (this._activeAnimation === this._animations[index]) return;
    this._lastAnimation = this._activeAnimation;
    if (this._lastAnimation) {
      this._lastAnimation.fadeOut(0.2);
    }
    this._activeAnimation = this._animations[index];
    this._activeAnimation.reset();
    this._activeAnimation.fadeIn(0.2);
    this._activeAnimation.play();
    this._AnimationChanged(index);
  }

  _AnimationChanged(index: number) {}
}

export { CustomObject };
