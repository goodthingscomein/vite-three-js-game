import { io } from 'socket.io-client';

function Connect(url: string) {
  const socket = io(url);
  return socket;
}

export { Connect };
