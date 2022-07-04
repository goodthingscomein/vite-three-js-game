import { Clock, PerspectiveCamera, Scene } from 'three';
import { MeshObject } from '../components/MeshObject';
import { World } from '../World';
import { Renderer } from './Renderer';

class Loop {
  _world: World;
  _camera: PerspectiveCamera;
  _scene: Scene;
  _renderer: Renderer;
  _clock: Clock;
  _updatables: MeshObject[];

  constructor(world: World, camera: PerspectiveCamera, scene: Scene, renderer: Renderer) {
    this._world = world;
    this._camera = camera;
    this._scene = scene;
    this._renderer = renderer;
    this._clock = new Clock(true);
    this._updatables = [];
  }

  /** Start the game Loop */
  _Start() {
    this._renderer._webGLRenderer.setAnimationLoop(() => {
      this._Tick();
      this._renderer._Render();
    });
  }

  /** Stop the game Loop */
  _Stop() {
    this._renderer._webGLRenderer.setAnimationLoop(null);
  }

  _Tick() {
    for (const obj of this._updatables) {
      obj._Tick();
    }
  }
}

export { Loop };
