import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import UserCursor from './UserCursor';

const CollaborativeEditor = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [code, setCode] = useState('');
  const [cursorPositions, setCursorPositions] = useState({});
  const editorRef = useRef();

  useEffect(() => {
    if (!socket) return;

    // Join room
    socket.emit('join_room', roomId);

    // Listen for code changes
    socket.on('receive_code_change', (data) => {
      if (data.senderId !== socket.id) {
        setCode(data.code);
      }
    });

    // Listen for cursor movements
    socket.on('receive_cursor_position', (data) => {
      if (data.senderId !== socket.id) {
        setCursorPositions(prev => ({
          ...prev,
          [data.user.id]: {
            position: data.position,
            user: data.user
          }
        }));
      }
    });

    return () => {
      socket.off('receive_code_change');
      socket.off('receive_cursor_position');
    };
  }, [socket, roomId]);

  const handleCodeChange = (value) => {
    setCode(value);
    socket.emit('code_change', { roomId, code: value });
  };

  const handleCursorChange = (selection) => {
    socket.emit('cursor_position', {
      roomId,
      position: selection.ranges[0],
      user: {
        id: socket.id,
        username: 'Current User', // Replace with actual user data
        profilepic: ''
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <CodeMirror
        ref={editorRef}
        value={code}
        height="100%"
        extensions={[javascript()]}
        theme={oneDark}
        onChange={handleCodeChange}
        onSelectionChange={handleCursorChange}
      />
      
      {/* Render other users' cursors */}
      {Object.entries(cursorPositions).map(([userId, data]) => (
        <UserCursor
          key={userId}
          position={data.position}
          user={data.user}
          editor={editorRef.current?.view}
        />
      ))}
    </div>
  );
};

export default CollaborativeEditor;