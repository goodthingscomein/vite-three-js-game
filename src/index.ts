import './style.css';

import { World } from './scripts/World';
import { CreateCube } from './scripts/prefabs/Cube';
import { CreateDirectionalLight } from './scripts/components/Light';

const _world = new World();
_world._Start();

const cube = CreateCube(0x66dd00);
_world._MakeMeshObjectInstance(cube); // Create a Cube
_world._MakeLightInstance(CreateDirectionalLight(0xffffff, 3));
