import { io } from 'socket.io-client';

function Connect(url: string, playerName: string, playerClass: string) {
  const socket = io(url, {
    extraHeaders: {
      'player-name': playerName,
      'player-class': playerClass,
    },
  });
  return socket;
}

export { Connect };
