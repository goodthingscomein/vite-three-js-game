import './style.css';

import { World } from './scripts/World';

/** This will create the world and connect to the server */
const _world = new World();
_world._Start(); // This will start the game loop

/** Prevent the context menu */
window.oncontextmenu = (e) => {
  e.preventDefault();
};
