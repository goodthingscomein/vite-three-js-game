import './style.css';

import { World } from './scripts/World';

const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  var playerNameInput = document.getElementById('playerName') as HTMLInputElement;
  var playerClassInput = document.getElementById('playerClass') as HTMLSelectElement;

  /** This will create the world and connect to the server */
  const _world = new World(playerNameInput.value, playerClassInput.value);
  _world._Start(); // This will start the game loop

  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.style.display = 'none';
});

/** Prevent the context menu */
window.oncontextmenu = (e) => {
  e.preventDefault();
};
