import { DirectionalLight, AmbientLight, ColorRepresentation, Vector3, Euler, Light } from 'three';
import { Updatable } from './Updatable';

class CustomLight extends Updatable {
  _light: Light;

  constructor(light: Light) {
    super();
    this._light = light;
  }
}

/** Create a Directional Light */
function CreateDirectionalLight(color: ColorRepresentation, intensity: number, position: Vector3) {
  const light = new DirectionalLight(color, intensity);
  light.position.copy(position);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;

  /** Create the custom light */
  const customLight = new CustomLight(light);
  return customLight;
}

/** Create an Ambient Light */
function CreateAmbientLight(color: ColorRepresentation, intensity: number) {
  const light = new AmbientLight(color, intensity);

  /** Create the custom light */
  const customLight = new CustomLight(light);
  return customLight;
}

export { CustomLight, CreateDirectionalLight, CreateAmbientLight };
