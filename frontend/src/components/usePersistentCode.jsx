// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const usePersistentCode = (roomId) => {
//   const [localCode, setLocalCode] = useState('');
//   const roomCode = useSelector(state => 
//     state.room.rooms.find(r => r._id === roomId)?.code || ''
//   );

//   useEffect(() => {
//     if (roomId && roomCode) {
//       setLocalCode(roomCode);
//     }
//   }, [roomId, roomCode]);

//   const handleCodeChange = (newCode) => {
//     setLocalCode(newCode);
//     // Save to localStorage for persistence
//     if (roomId) {
//       localStorage.setItem(`roomCode-${roomId}`, newCode);
//     }
//   };

//   // Get from localStorage on initial load
//   useEffect(() => {
//     if (roomId) {
//       const savedCode = localStorage.getItem(`roomCode-${roomId}`) || roomCode;
//       setLocalCode(savedCode);
//     }
//   }, [roomId]);

//   return {
//     code: localCode,
//     handleCodeChange
//   };
// };

// export default usePersistentCode;



import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const usePersistentCode = (roomId) => {
  const [localCode, setLocalCode] = useState('');
  const roomCode = useSelector(state => 
    state.room.rooms.find(r => r._id === roomId)?.code || ''
  );

  useEffect(() => {
    if (roomId && roomCode) {
      setLocalCode(roomCode);
    }
  }, [roomId, roomCode]);

  const handleCodeChange = (newCode) => {
    setLocalCode(newCode);
    if (roomId) {
      localStorage.setItem(`roomCode-${roomId}`, newCode);
    }
  };

  useEffect(() => {
    if (roomId) {
      const savedCode = localStorage.getItem(`roomCode-${roomId}`) || roomCode;
      setLocalCode(savedCode);
    }
  }, [roomId]);

  return {
    code: localCode,
    handleCodeChange
  };
};

export default usePersistentCode;
