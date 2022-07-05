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
import { NetworkManager, SetupData } from './systems/NetworkManager';

let networkManager: NetworkManager;

let canvas: HTMLCanvasElement;
let scene: Scene;
let customCamera: CustomCamera;
let renderer: Renderer;

let loop: Loop;

let networkedObjects: Map<number, CustomObject>;
let networkedLights: Map<number, CustomLight>;

class World {
  constructor() {
    canvas = document.querySelector<HTMLCanvasElement>('#c')!;
    scene = CreateScene(0x222222);
    customCamera = new CustomCamera();
    renderer = new Renderer(canvas, scene, customCamera._camera);
    loop = new Loop(this, customCamera, scene, renderer);
    networkedObjects = new Map<number, CustomObject>();
    networkedLights = new Map<number, CustomLight>();

    /** Connect to the server */
    networkManager = new NetworkManager('http://localhost:4000');

    /** Listen for the setup message from the server */
    networkManager._PlayerSetup = (data) => {
      /** Initialize the world */
      this._Init(data);
    };
  }

  _Init(data: SetupData) {
    /** Create the player object */
    const player = CreatePlayer(data.color);
    player._mesh.position.copy(data.position);
    player._mesh.rotation.copy(data.rotation);
    this._MakeMeshObjectInstance(player);
    customCamera._SetPlayerToFollow(player);
    this._AddNetworkedObject(data.id, player);

    /** Create the directional light */
    const directionalLight = CreateDirectionalLight(0xffffff, 4, new Vector3(100, 100, 100));
    this._MakeLightInstance(directionalLight);

    /** Create the ambient light */
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
    loop._updatables.push(obj);
  }

  _MakeLightInstance(light: CustomLight) {
    scene.add(light._light);
  }

  /** Set networked objects in map */
  _AddNetworkedObject(id: number, obj: CustomObject) {
    networkedObjects.set(id, obj);
  }

  /** Set networked lights in map */
  _AddNetworkedLight(id: number, light: CustomLight) {
    networkedLights.set(id, light);
  }
}

export { World };
