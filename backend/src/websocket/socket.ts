import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const setupWebSocket = (io: Server) => {
  // Authentication middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join project rooms
    socket.on('project:join', (projectId: string) => {
      socket.join(`project:${projectId}`);
      console.log(`User ${socket.userId} joined project ${projectId}`);
    });

    // Leave project rooms
    socket.on('project:leave', (projectId: string) => {
      socket.leave(`project:${projectId}`);
      console.log(`User ${socket.userId} left project ${projectId}`);
    });

    // User presence
    socket.on('user:online', () => {
      socket.broadcast.emit('user:status', {
        userId: socket.userId,
        status: 'online',
      });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      socket.broadcast.emit('user:status', {
        userId: socket.userId,
        status: 'offline',
      });
    });
  });
};
