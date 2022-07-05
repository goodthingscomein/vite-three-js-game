import './style.css';

import { World } from './scripts/World';

const _world = new World();
_world._Start();

/** Prevent the context menu */
window.oncontextmenu = (e) => {
  e.preventDefault();
};
