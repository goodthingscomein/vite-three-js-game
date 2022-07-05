import { ColorRepresentation, Vector3, Euler } from 'three';
import { Socket } from 'socket.io-client';
import { Connect } from '../../services/socket';

class NetworkManager {
  _socket: Socket | undefined;

  constructor(url: string) {
    this._Connect(url);
  }

  /** Connect to server */
  _Connect(url: string) {
    /** Connect to the server using the socket */
    if (this._socket) this._socket.connect(); // Reconnect
    else this._socket = Connect(url); // Connect for first time

    /** Add all of the socket listeners */
    this._AddSocketListeners();
  }

  /** Disconnect from server */
  _Disconnect() {
    if (!this._socket) return;
    this._socket.disconnect();
  }

  /** Setup all of the socket listeners */
  private _AddSocketListeners() {
    if (!this._socket) return;
    this._socket.on('me:setup', (data: SetupData) => this._PlayerSetup(data));
  }

  _PlayerSetup(data: SetupData) {}
}

export { NetworkManager };

/** Data Types */
export type SetupData = {
  id: number;
  color: ColorRepresentation;
  position: Vector3;
  rotation: Euler;
};
