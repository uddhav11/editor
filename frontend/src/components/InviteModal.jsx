
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { inviteUser } from '../redux/roomSlice';

// const InviteModal = ({ roomId, onClose }) => {
//   const [userCode, setUserCode] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(inviteUser({ roomId, userCode }));
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">Invite to Room</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Enter User Code
//             </label>
//             <input
//               type="text"
//               value={userCode}
//               onChange={(e) => setUserCode(e.target.value)}
//               className="w-full bg-neutral-700 rounded-lg px-4 py-2"
//               placeholder="e.g., ABCD1234"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
//             >
//               Send Invite
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InviteModal;




import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inviteUser } from '../redux/roomSlice';

const InviteModal = ({ roomId, onClose }) => {
  const [userCode, setUserCode] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(inviteUser({ roomId, userCode }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Invite to Room</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Enter User Code
            </label>
            <input
              type="text"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full bg-neutral-700 rounded-lg px-4 py-2"
              placeholder="e.g., ABCD1234"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;