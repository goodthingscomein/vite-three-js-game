import { Clock, PerspectiveCamera, Scene } from 'three';
import { MeshObject } from '../components/MeshObject';
import { World } from '../World';
import { Renderer } from './Renderer';

let clock: Clock;

class Loop {
  _world: World;
  _camera: PerspectiveCamera;
  _scene: Scene;
  _renderer: Renderer;
  _updatables: MeshObject[];

  constructor(world: World, camera: PerspectiveCamera, scene: Scene, renderer: Renderer) {
    this._world = world;
    this._camera = camera;
    this._scene = scene;
    this._renderer = renderer;
    this._updatables = [];

    clock = new Clock();
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
    const deltaTime = clock.getDelta();
    for (const obj of this._updatables) {
      obj._Tick(deltaTime);
    }
  }
}

export { Loop };
