import type { PerspectiveCamera, Scene, Mesh, Light } from 'three';

// Systems
import { Renderer } from './systems/Renderer';
import { Loop } from './systems/Loop';

// Components
import { CreateScene } from './components/Scene';
import { CreateCamera } from './components/Camera';
import { MeshObject } from './components/MeshObject';

let canvas: HTMLCanvasElement;
let scene: Scene;
let camera: PerspectiveCamera;
let renderer: Renderer;

let loop: Loop;

let meshObjects: MeshObject[];
let lightObjects: Light[];

class World {
  constructor() {
    canvas = document.querySelector<HTMLCanvasElement>('#c')!;
    scene = CreateScene(0x222222);
    camera = CreateCamera();
    renderer = new Renderer(canvas, scene, camera);
    loop = new Loop(this, camera, scene, renderer);
    meshObjects = [];
    lightObjects = [];

    /** Initialize the world */
    this._Init();
  }

  _Init() {
    camera.position.set(0, 7, 20); // Move the camera backwards
    camera.rotation.set(-0.25, 0, 0); // Move the camera backwards
  }

  /** Start the game loop */
  _Start() {
    loop._Start();
  }

  /** Stop the game loop */
  _Stop() {
    loop._Stop();
  }

  _MakeInstance(obj: Mesh) {
    scene.add(obj);
  }

  _MakeMeshObjectInstance(obj: MeshObject) {
    scene.add(obj._mesh);
    meshObjects.push(obj); // Store the mesh
    loop._updatables.push(obj);
  }

  _MakeLightInstance(light: Light) {
    scene.add(light);
    lightObjects.push(light); // Store the light
  }

  _GetAllMeshes() {
    return meshObjects;
  }
}

export { World };
