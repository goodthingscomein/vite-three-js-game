class PlayerInput {
  constructor() {
    /** Keys Pressed Listener */
    window.addEventListener('keydown', (e) => {
      if (e.key === 'w') this._WPressed();
      if (e.key === 'a') this._APressed();
      if (e.key === 's') this._SPressed();
      if (e.key === 'd') this._DPressed();
      if (e.key === ' ') this._SpacePressed();
    });
    /** Keys Released Listener */
    window.addEventListener('keyup', (e) => {
      if (e.key === 'w') this._WReleased();
      if (e.key === 'a') this._AReleased();
      if (e.key === 's') this._SReleased();
      if (e.key === 'd') this._DReleased();
      if (e.key === ' ') this._SpaceReleased();
    });
  }

  /** Keys Pressed */
  _WPressed() {}
  _SPressed() {}
  _APressed() {}
  _DPressed() {}
  _SpacePressed() {}

  /** Keys Released */
  _WReleased() {}
  _SReleased() {}
  _AReleased() {}
  _DReleased() {}
  _SpaceReleased() {}
}

export { PlayerInput };
