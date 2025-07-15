// import { createContext, useContext, useEffect } from 'react';
// import socket from '../utils/socket';

// const RoomContext = createContext();

// export const RoomProvider = ({ children, roomId }) => {
//   useEffect(() => {
//     if (!roomId) return;
    
//     socket.connect();
//     socket.emit('join_room', roomId);

//     return () => {
//       socket.emit('leave_room', roomId);
//       socket.disconnect();
//     };
//   }, [roomId]);

//   return (
//     <RoomContext.Provider value={{ socket }}>
//       {children}
//     </RoomContext.Provider>
//   );
// };

// export const useRoom = () => useContext(RoomContext);



import { createContext, useContext, useEffect, useState } from 'react';
import socket from '../utils/socket';

const RoomContext = createContext();

export const RoomProvider = ({ children, roomId }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [members, setMembers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  // Handle code updates
  const updateCode = (newCode) => {
    setCode(newCode);
    socket.emit('code_update', { roomId, code: newCode });
  };

  // Handle language changes
  const updateLanguage = (newLanguage) => {
    console.log('this is the roomID', roomId)
    setLanguage(newLanguage);
    console.log('this is the code:- ', newLanguage)
    socket.emit('language_update', { roomId, language: newLanguage });
  };

  // Handle cursor position updates
  const updateCursorPosition = (position, color) => {
    socket.emit('cursor_position', {
      roomId,
      position,
      color
    });
  };

  useEffect(() => {
    if (!roomId) return;

    socket.connect();
    socket.emit('join_room', roomId);

    // Setup event listeners
    socket.on('code_sync', (data) => {
      setCode(data.code);
      setLanguage(data.language);
    });

    socket.on('code_update', (data) => {
      if (data.senderId !== socket.id) {
        setCode((prev) => {
      if (prev !== data.code) return data.code;
      return prev;
    });
      }
    });

    socket.on('language_update', (data) => {
      if (data.senderId !== socket.id) {
        setLanguage(data.language);
      }
    });

    socket.on('members_update', (updatedMembers) => {
      setMembers(updatedMembers);
    });

    socket.on('cursor_position', (data) => {
      if (data.user.id !== socket.id) {
        setCursorPositions(prev => ({
          ...prev,
          [data.user.id]: data
        }));
      }
    });

    return () => {
      socket.off('code_sync');
      socket.off('code_update');
      socket.off('language_update');
      socket.off('members_update');
      socket.off('cursor_position');
      socket.emit('leave_room', roomId);
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <RoomContext.Provider value={{
      code,
      language,
      members,
      cursorPositions,
      updateCode,
      updateLanguage,
      updateCursorPosition,
      socketId: socket.id
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);