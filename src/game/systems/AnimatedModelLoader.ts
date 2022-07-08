import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer, Group } from 'three';

class AnimatedModelLoader {
  _model: Group | undefined;
  _mixer: AnimationMixer | undefined;

  constructor(pathName: string, modelFileName: string, animationsFileNames?: string[]) {
    const modelPath = './assets/models/' + pathName + '/';
    // const animationsPath = './assets/animations/' + pathName + '/';

    this._Init(modelPath, modelFileName);
  }

  async _Init(modelPath: string, modelFileName: string) {
    this._model = await this._LoadModel(modelPath, modelFileName);
    this._UpdateModel(this._model, 0.015);
    this._OnLoadComplete();
  }

  async _LoadModel(path: string, fileName: string) {
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

  _LoadAnimations(path: string, fileNames: string[], fbx: Group) {
    this._mixer = new AnimationMixer(fbx);
    const anim = new FBXLoader();
    anim.setPath(path);
    for (let i = 0; i < fileNames.length; i++) {
      anim.load(fileNames[i] + '.fbx', (anim) => {
        if (!this._mixer) return; // Check that the mixer exists
        this._mixer.clipAction(anim.animations[i]);
      });
    }
  }

  _OnLoadComplete() {}
}

export { AnimatedModelLoader };
