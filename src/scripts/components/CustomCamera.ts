import { PerspectiveCamera, Vector3 } from 'three';
import { CustomObject } from './CustomObject';
import { Updatable } from './Updatable';

let player: CustomObject | undefined;

let idealCameraPosition: Vector3 | null = null;
let idealCameraLookAt: Vector3 | null = null;
let idealCameraZoom: number = 10;

class CustomCamera extends Updatable {
  _fov: number; // AKA Field of View
  _aspect: number;
  _near: number; // the near clipping plane
  _far: number; // the far clipping plane
  _camera: PerspectiveCamera;

  constructor() {
    super();
    this._fov = 35; // AKA Field of View
    this._aspect = 1;
    this._near = 0.1; // the near clipping plane
    this._far = 5000; // the far clipping plane

    this._camera = new PerspectiveCamera(this._fov, this._aspect, this._near, this._far);
  }

  /** Override the Updatable tick function */
  _Tick(deltaTime: number) {
    /** Calculate all of the camera ideal transforms */
    calculateIdealPosition();
    calculateIdealLookAt();
    calculateIdealZoom();

    /** Update the camera */
    if (idealCameraPosition !== null) this._camera.position.copy(idealCameraPosition);
    if (idealCameraLookAt !== null) this._camera.lookAt(idealCameraLookAt);
  }

  _SetPlayerToFollow(obj: CustomObject) {
    player = obj;
  }
}

function calculateIdealPosition() {
  if (!player) return;
  const idealOffset = new Vector3(0, 5, -20);
  idealOffset.applyQuaternion(player._mesh.quaternion);
  idealOffset.add(player._mesh.position);

  /** Set the ideal position for the camera */
  idealCameraPosition = idealOffset;
}
function calculateIdealLookAt() {
  if (!player) return;
  const idealLookat = new Vector3(0, 0, 10);
  idealLookat.applyQuaternion(player._mesh.quaternion);
  idealLookat.add(player._mesh.position);

  /** Set the ideal lookAt for the camera */
  idealCameraLookAt = idealLookat;
}
function calculateIdealZoom() {
  if (!player) return;
}

export { CustomCamera };
