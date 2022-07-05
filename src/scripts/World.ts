import { Scene, Mesh, MathUtils, Vector3 } from 'three';

// Systems
import { Renderer } from './systems/Renderer';
import { Loop } from './systems/Loop';

// Components
import { CreateScene } from './components/Scene';
import { CustomCamera } from './components/CustomCamera';
import { CustomObject } from './components/CustomObject';

// Prefabs
import { CreatePlayer } from './prefabs/Player';
import { CreateDirectionalLight, CreateAmbientLight, CustomLight } from './components/CustomLight';
import { CreateGround } from './prefabs/Ground';
import { CreateSkybox } from './prefabs/Skybox';

let canvas: HTMLCanvasElement;
let scene: Scene;
let customCamera: CustomCamera;
let renderer: Renderer;

let loop: Loop;

let customObjects: CustomObject[];
let customLights: CustomLight[];

class World {
  constructor() {
    canvas = document.querySelector<HTMLCanvasElement>('#c')!;
    scene = CreateScene(0x222222);
    customCamera = new CustomCamera();
    renderer = new Renderer(canvas, scene, customCamera._camera);
    loop = new Loop(this, customCamera, scene, renderer);
    customObjects = [];
    customLights = [];

    /** Initialize the world */
    this._Init();
  }

  _Init() {
    /** Create the player object */
    const player = CreatePlayer(0x66dd00);
    this._MakeMeshObjectInstance(player);
    customCamera._SetPlayerToFollow(player);

    /** Create the directional light */
    const directionalLight = CreateDirectionalLight(0xffffff, 4, new Vector3(100, 100, 100));
    this._MakeLightInstance(directionalLight);

    /** Create the directional light */
    const ambientLight = CreateAmbientLight(0xffeecc, 1);
    this._MakeLightInstance(ambientLight);

    /** Create the ground object */
    const ground = CreateGround();
    this._MakeInstance(ground);

    /** Create the skybox */
    const skybox = CreateSkybox();
    this._MakeInstance(skybox);

    /** Set the camera position */
    customCamera._camera.position.set(0, 7, -20); // Move the camera backwards
    customCamera._camera.rotation.set(MathUtils.degToRad(15), MathUtils.degToRad(180), 0); // Move the camera backwards
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

  _MakeMeshObjectInstance(obj: CustomObject) {
    scene.add(obj._mesh);
    customObjects.push(obj); // Store the mesh
    loop._updatables.push(obj);
  }

  _MakeLightInstance(light: CustomLight) {
    scene.add(light._light);
    customLights.push(light); // Store the light
  }

  _GetAllMeshes() {
    return customObjects;
  }
}

export { World };
