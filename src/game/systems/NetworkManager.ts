import { ColorRepresentation, Vector3, Euler } from 'three';
import { Socket } from 'socket.io-client';
import { Connect } from '../../services/socket';

class NetworkManager {
  _socket: Socket | undefined;

  constructor(url: string, playerName: string, playerClass: string) {
    this._Connect(url, playerName, playerClass);
  }

  /** Connect to server */
  _Connect(url: string, playerName: string, playerClass: string) {
    this._socket = Connect(url, playerName, playerClass); // Connect for first time

    /** Add all of the socket listeners */
    this._AddSocketListeners();
  }

  /** Reconnect to server */
  _Reconnect() {
    if (!this._socket) return;
    this._socket.connect(); // Reconnect

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
    this._socket.on('player:joined', (data: PlayerJoinedData) => this._PlayerJoined(data));
    this._socket.on('players:existing', (data: PlayersExistingData) => this._PlayersExisting(data));
    this._socket.on('player:transform', (data: TransformChangeData) => this._TransformChange(data));
    this._socket.on('player:animation', (data: AnimationChangeData) => this._AnimationChange(data));
  }

  /** Socket Listener Events */
  _PlayerSetup(data: SetupData) {}
  _PlayerJoined(data: PlayerJoinedData) {}
  _PlayerLeft(data: SetupData) {}
  _PlayersExisting(data: PlayersExistingData) {}
  _TransformChange(data: TransformChangeData) {}
  _AnimationChange(data: AnimationChangeData) {}

  /** Socket Emit Events */
  _SendTransform(position: Vector3, rotation: Euler) {
    if (!this._socket) return;
    this._socket.emit('player:transform', { position, rotation });
  }

  _SendAnimation(index: number) {
    if (!this._socket) return;
    this._socket.emit('player:animation', index);
  }
}

export { NetworkManager };

/** Data Types */
export type SetupData = {
  id: number;
  playerName: string;
  playerClass: string;
  color: ColorRepresentation;
  position: Vector3;
  rotation: Euler;
};

export type PlayerJoinedData = {
  id: number;
  playerName: string;
  playerClass: string;
  color: ColorRepresentation;
  position: Vector3;
  rotation: Euler;
};

type PlayerData = {
  playerName: string;
  playerClass: string;
  color: ColorRepresentation;
  position: Vector3;
  rotation: Euler;
};
type ExistingPlayer = [id: number, data: PlayerData];
export type PlayersExistingData = ExistingPlayer[];

type TransformChangeData = {
  id: number;
  position: Vector3;
  rotation: Euler;
};

type AnimationChangeData = {
  id: number;
  index: number;
};
