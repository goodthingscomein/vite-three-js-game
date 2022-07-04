import './style.css';

import { World } from './scripts/World';
import { StartRenderLoop } from './scripts/systems/RenderLoop';

const _world = new World();
StartRenderLoop(_world._renderer);
