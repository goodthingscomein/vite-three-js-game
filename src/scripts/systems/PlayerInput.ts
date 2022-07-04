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
    /** Mouse Pressed Listener */
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) this._LMBPressed();
      if (e.button === 1) this._MMBPressed();
      if (e.button === 2) this._RMBPressed();
    });
    /** Mouse Released Listener */
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this._LMBReleased();
      if (e.button === 1) this._MMBReleased();
      if (e.button === 2) this._RMBReleased();
    });
    /** Mouse Movement Listener */
    window.addEventListener('mousemove', (e) => this._MouseMove(e));
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

  /** Mouse Pressed */
  _LMBPressed() {}
  _RMBPressed() {}
  _MMBPressed() {}

  /** Mouse Released */
  _LMBReleased() {}
  _RMBReleased() {}
  _MMBReleased() {}

  /** Mouse Movement */
  _MouseMove(e: MouseEvent) {}
}

export { PlayerInput };
