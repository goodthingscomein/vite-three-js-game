import { PerspectiveCamera } from 'three';

function CreateCamera() {
  /** Create the Camera params */
  const fov = 35; // AKA Field of View
  const aspect = 1;
  const near = 1; // the near clipping plane
  const far = 5000; // the far clipping plane

  /** Create the camera */
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  return camera;
}

export { CreateCamera };
