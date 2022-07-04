import { DirectionalLight, ColorRepresentation } from 'three';

function CreateDirectionalLight(color: ColorRepresentation, intensity: number) {
  /** Create a Directional Light */
  const light = new DirectionalLight(color, intensity);
  light.position.set(10, 10, 10); // light always shines towards (0, 0, 0)
  return light;
}

export { CreateDirectionalLight };
