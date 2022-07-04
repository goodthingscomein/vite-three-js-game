import { WebGLRenderer, Clock } from 'three';

export default class RenderLoop {
  _renderer: WebGLRenderer;
  _clock: Clock;

  constructor(renderer: WebGLRenderer) {
    this._renderer = renderer;
    this._clock = new Clock(true);
  }
}
