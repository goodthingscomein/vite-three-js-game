import { Color, Scene, ColorRepresentation } from 'three';

function CreateScene(color: ColorRepresentation) {
  const scene = new Scene();
  scene.background = new Color(color);
  return scene;
}

export { CreateScene };
