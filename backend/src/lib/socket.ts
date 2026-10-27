import { Server } from 'socket.io';

let io: Server;

export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
