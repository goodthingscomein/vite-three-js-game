import { BoxBufferGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export default class Main {
  _canvas?: HTMLCanvasElement;
  _scene?: Scene;
  _camera?: PerspectiveCamera;
  _renderer?: WebGLRenderer;

  constructor() {
    this._Init();
  }

  _Init() {
    /** Get the canvas */
    this._canvas = document.querySelector<HTMLCanvasElement>('#c')!;

    /** Create a new Scene */
    this._scene = new Scene();

    /** Create the Camera params */
    const fov = 35; // AKA Field of View
    const aspect = this._canvas.clientWidth / this._canvas.clientHeight;
    const near = 1; // the near clipping plane
    const far = 5000; // the far clipping plane

    /** Create a Camera */
    this._camera = new PerspectiveCamera(fov, aspect, near, far);

    /** Set the Scene background color */
    this._scene.background = new Color('#222222');

    // move the camera back so we can view the scene
    this._camera.position.set(0, 0, 10);

    // create a geometry
    const geometry = new BoxBufferGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    // add the mesh to the scene
    this._scene.add(cube);

    // create the renderer
    const renderer = new WebGLRenderer({ canvas: this._canvas });

    // next, set the renderer to the same size as our container element
    renderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight);

    // finally, set the pixel ratio so that our scene will look good on HiDPI displays
    renderer.setPixelRatio(window.devicePixelRatio);

    // render, or 'create a still image', of the scene
    renderer.render(this._scene, this._camera);
  }
}
