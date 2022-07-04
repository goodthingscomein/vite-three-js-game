import type { PerspectiveCamera, Scene } from 'three';

// Systems
import { Renderer } from './systems/Renderer';

// Components
import { CreateScene } from './components/Scene';
import { CreateCamera } from './components/Camera';
import { CreateCube } from './components/Cube';
import { CreateDirectionalLight } from './components/Light';

class World {
  _canvas: HTMLCanvasElement;
  _scene: Scene;
  _camera: PerspectiveCamera;
  _renderer: Renderer;

  constructor() {
    this._canvas = document.querySelector<HTMLCanvasElement>('#c')!;
    this._scene = CreateScene(0x222222);
    this._camera = CreateCamera();
    this._renderer = new Renderer(this._canvas, this._scene, this._camera);
    this._Init();
  }

  _Init() {
    this._camera.position.set(0, 0, 10); // Move the camera backwards
    const cube = CreateCube(0x66dd00);
    cube.rotation.set(-0.5, -0.1, 0.8);
    this._scene.add(cube); // Create a Cube
    this._scene.add(CreateDirectionalLight(0xffffff, 3));
  }
}

export { World };
