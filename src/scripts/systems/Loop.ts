import { Clock, Scene } from 'three';
import { CustomCamera } from '../components/CustomCamera';
import { Updatable } from '../components/Updatable';
import { World } from '../World';
import { Renderer } from './Renderer';

let clock: Clock;

class Loop {
  _world: World;
  _scene: Scene;
  _renderer: Renderer;
  _updatables: Updatable[];

  constructor(world: World, camera: CustomCamera, scene: Scene, renderer: Renderer) {
    this._world = world;
    this._scene = scene;
    this._renderer = renderer;
    this._updatables = [camera];

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

    /** Update all of the updatables */
    for (const updatable of this._updatables) {
      updatable._Tick(deltaTime);
    }
  }
}

export { Loop };
