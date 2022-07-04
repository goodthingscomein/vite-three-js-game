import { DirectionalLight, AmbientLight, ColorRepresentation } from 'three';

/** Create a Directional Light */
function CreateDirectionalLight(color: ColorRepresentation, intensity: number) {
  const light = new DirectionalLight(color, intensity);
  light.position.set(100, 100, 100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  return light;
}

/** Create a Directional Light */
function CreateAmbientLight(color: ColorRepresentation, intensity: number) {
  const light = new AmbientLight(color, intensity);
  return light;
}

export { CreateDirectionalLight, CreateAmbientLight };
