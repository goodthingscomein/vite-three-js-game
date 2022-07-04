import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';

class Renderer {
  _renderer: WebGLRenderer;
  _scene: Scene;
  _camera: PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement, scene: Scene, camera: PerspectiveCamera) {
    this._scene = scene;
    this._camera = camera;
    this._renderer = this._CreateRenderer(canvas);
  }

  _CreateRenderer(canvas: HTMLCanvasElement) {
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.physicallyCorrectLights = true;
    return renderer;
  }

  /** Render */
  _Render() {
    /** Check if the window has been resized - Update the size of the renderer */
    if (ResizeRendererToDisplaySize(this._renderer)) SetSize(this._camera, this._renderer);
    this._renderer.render(this._scene, this._camera);
  }
}

/** Checks if the renderer output resolution */
function ResizeRendererToDisplaySize(renderer: WebGLRenderer): boolean {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

/** Updates the resolution of the renderer to match the canvas */
const SetSize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
};

/** The render loop logic */
function RenderLoop(renderer: Renderer) {
  renderer._Render();
}

export { Renderer, RenderLoop };
