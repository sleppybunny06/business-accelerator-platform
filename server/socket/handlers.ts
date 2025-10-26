import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export const setupSocketHandlers = (io: Server) => {
  // Authentication middleware for socket connections
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.user.id;
      socket.userRole = decoded.user.role;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected`);

    // Join user-specific room
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Join role-specific rooms
    if (socket.userRole) {
      socket.join(`role:${socket.userRole}`);
    }

    // Handle chat messages
    socket.on('send_message', (data) => {
      const { recipientId, message, type = 'text' } = data;
      
      // Emit to specific user
      socket.to(`user:${recipientId}`).emit('new_message', {
        senderId: socket.userId,
        message,
        type,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle joining chat rooms
    socket.on('join_chat', (chatId) => {
      socket.join(`chat:${chatId}`);
      console.log(`User ${socket.userId} joined chat ${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on('leave_chat', (chatId) => {
      socket.leave(`chat:${chatId}`);
      console.log(`User ${socket.userId} left chat ${chatId}`);
    });

    // Handle pitch presentation rooms
    socket.on('join_pitch_room', (pitchId) => {
      socket.join(`pitch:${pitchId}`);
      socket.to(`pitch:${pitchId}`).emit('user_joined_pitch', {
        userId: socket.userId,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle real-time collaboration
    socket.on('business_update', (data) => {
      const { businessId, update } = data;
      socket.to(`business:${businessId}`).emit('business_updated', {
        update,
        updatedBy: socket.userId,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle notifications
    socket.on('send_notification', (data) => {
      const { recipientId, type, title, message, data: notificationData } = data;
      
      socket.to(`user:${recipientId}`).emit('new_notification', {
        type,
        title,
        message,
        data: notificationData,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { chatId } = data;
      socket.to(`chat:${chatId}`).emit('user_typing', {
        userId: socket.userId,
        chatId,
      });
    });

    socket.on('typing_stop', (data) => {
      const { chatId } = data;
      socket.to(`chat:${chatId}`).emit('user_stopped_typing', {
        userId: socket.userId,
        chatId,
      });
    });

    // Handle online status
    socket.on('update_status', (status) => {
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
      
      // Notify others about user going offline
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status: 'offline',
        timestamp: new Date().toISOString(),
      });
    });

    // Handle video call events
    socket.on('call_user', (data) => {
      const { recipientId, offer, callType } = data;
      socket.to(`user:${recipientId}`).emit('incoming_call', {
        callerId: socket.userId,
        offer,
        callType,
      });
    });

    socket.on('answer_call', (data) => {
      const { callerId, answer } = data;
      socket.to(`user:${callerId}`).emit('call_answered', {
        answer,
        responderId: socket.userId,
      });
    });

    socket.on('end_call', (data) => {
      const { recipientId } = data;
      socket.to(`user:${recipientId}`).emit('call_ended', {
        endedBy: socket.userId,
      });
    });

    // Handle live pitch streaming
    socket.on('start_pitch_stream', (data) => {
      const { pitchId } = data;
      socket.to(`pitch:${pitchId}`).emit('pitch_stream_started', {
        streamerId: socket.userId,
        pitchId,
      });
    });

    socket.on('pitch_stream_data', (data) => {
      const { pitchId, streamData } = data;
      socket.to(`pitch:${pitchId}`).emit('pitch_stream_update', {
        streamData,
        timestamp: new Date().toISOString(),
      });
    });
  });

  // Handle server-side events
  const notifyUsers = (userIds: string[], notification: any) => {
    userIds.forEach(userId => {
      io.to(`user:${userId}`).emit('new_notification', notification);
    });
  };

  const broadcastToRole = (role: string, event: string, data: any) => {
    io.to(`role:${role}`).emit(event, data);
  };

  // Export utilities for use in other parts of the application
  (io as any).notifyUsers = notifyUsers;
  (io as any).broadcastToRole = broadcastToRole;
};