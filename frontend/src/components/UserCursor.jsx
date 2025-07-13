import React, { useEffect, useState } from 'react';

const UserCursor = ({ position, user, editor }) => {
  const [cursorPos, setCursorPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (position && editor) {
      try {
        const coords = editor.coordsAtPos(position.head);
        if (coords) {
          setCursorPos({
            left: coords.left,
            top: coords.top
          });
        }
      } catch (e) {
        console.error('Error positioning cursor:', e);
      }
    }
  }, [position, editor]);

  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{
        left: `${cursorPos.left}px`,
        top: `${cursorPos.top}px`,
      }}
    >
      <div className="flex items-center">
        <div className="w-2 h-5 bg-green-500"></div>
        <div className="ml-1 px-2 py-1 bg-green-500 text-white text-xs rounded">
          {user.username}
        </div>
      </div>
    </div>
  );
};

export default UserCursor;