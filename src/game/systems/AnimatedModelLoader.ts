import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationAction, AnimationMixer, Group } from 'three';

class AnimatedModelLoader {
  _model: Group | undefined;
  _mixer: AnimationMixer | undefined;
  _animations: AnimationAction[] = [];

  constructor(pathName: string, modelFileName: string, animationsFileNames: string[]) {
    const modelPath = './assets/models/' + pathName + '/';
    const animationsPath = './assets/animations/' + pathName + '/';

    const init = async () => {
      this._model = await this._LoadModelAsync(modelPath, modelFileName);
      this._UpdateModel(this._model, 0.015); // Update the model size and shadows
      this._mixer = new AnimationMixer(this._model);
      for (let i = 0; i < animationsFileNames.length; i++) {
        const animation = await this._LoadAnimationAsync(animationsPath, animationsFileNames[i], this._mixer);
        this._animations.push(animation);
      }
      this._OnLoadComplete();
    };

    init();
  }

  async _LoadModelAsync(path: string, fileName: string) {
    const loader = new FBXLoader();
    loader.setPath(path);
    return await loader.loadAsync(fileName + '.fbx');
  }

  _UpdateModel(fbx: Group, scale: number) {
    fbx.scale.setScalar(scale);
    fbx.traverse((c) => {
      c.castShadow = true;
    });
  }

  async _LoadAnimationAsync(path: string, fileName: string, mixer: AnimationMixer) {
    const loader = new FBXLoader();
    loader.setPath(path);
    const anim = await loader.loadAsync(fileName + '.fbx');
    return mixer.clipAction(anim.animations[0]);
  }

  _OnLoadComplete() {}
}

export { AnimatedModelLoader };
