import './style.css';

import { World } from './scripts/World';
import { CreatePlayer } from './scripts/prefabs/Player';
import { CreateGround } from './scripts/prefabs/Ground';
import { CreateAmbientLight, CreateDirectionalLight } from './scripts/components/Light';
import { CreateSkybox } from './scripts/prefabs/Skybox';

const _world = new World();
_world._Start();

/** Create the player object */
const player = CreatePlayer(0x66dd00);
_world._MakeMeshObjectInstance(player);

/** Create the directional light */
const directionalLight = CreateDirectionalLight(0xffffff, 4);
_world._MakeLightInstance(directionalLight);

/** Create the directional light */
const ambientLight = CreateAmbientLight(0xffeecc, 1);
_world._MakeLightInstance(ambientLight);

/** Create the ground object */
const ground = CreateGround();
_world._MakeInstance(ground);

/** Create the skybox */
const skybox = CreateSkybox();
_world._MakeInstance(skybox);
