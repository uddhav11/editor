import { createContext, useContext, useEffect } from 'react';
import socket from '../utils/socket';

const RoomContext = createContext();

export const RoomProvider = ({ children, roomId }) => {
  useEffect(() => {
    if (!roomId) return;
    
    socket.connect();
    socket.emit('join_room', roomId);

    return () => {
      socket.emit('leave_room', roomId);
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <RoomContext.Provider value={{ socket }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);