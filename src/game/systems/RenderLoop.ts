import { Renderer } from './Renderer';

function StartRenderLoop(renderer: Renderer) {
  function RenderLoop() {
    renderer._Render();
    requestAnimationFrame(RenderLoop);
  }
  requestAnimationFrame(RenderLoop);
}

export { StartRenderLoop };
