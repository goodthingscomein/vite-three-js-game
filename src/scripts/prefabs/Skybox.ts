import { BoxGeometry, Mesh, MeshBasicMaterial, BackSide, TextureLoader } from 'three';

function CreateSkybox() {
  const skyboxMaterialArray = CreateMaterialArray('skybox');
  const skyboxGeometry = new BoxGeometry(2000, 2000, 2000);
  const skybox = new Mesh(skyboxGeometry, skyboxMaterialArray);
  skybox.castShadow = false;
  skybox.receiveShadow = false;

  return skybox;
}

/** Create an array of all of the paths of the Skybox PNGs */
function CreatePathStrings(filename: string) {
  const basePath = '../../assets/textures/skybox/';
  const baseFilename = basePath + filename;
  const fileType = '.png';
  const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
  const pathStings = sides.map((side) => {
    return baseFilename + '_' + side + fileType;
  });

  return pathStings;
}

/** Create array of all Skybox textures from PNGs */
function CreateMaterialArray(filename: string) {
  const skyboxImagePaths = CreatePathStrings(filename);
  const materialArray = skyboxImagePaths.map((image) => {
    let texture = new TextureLoader().load(image);
    return new MeshBasicMaterial({ map: texture, side: BackSide });
  });

  return materialArray;
}

export { CreateSkybox };
