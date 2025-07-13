// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   getAllRooms, 
//   joinRoomRequest, 
//   handleJoinRequest,
//   leaveRoom
// } from '../redux/roomSlice';
// import { FaUser, FaUserShield, FaCode, FaLock, FaUnlock, FaCheck, FaTimes, FaEnvelope, FaGlobe, FaChevronLeft, FaSignOutAlt } from 'react-icons/fa';
// import { BsGearFill } from 'react-icons/bs';
// import { toast } from 'react-hot-toast';
// import Loader from '../components/Loader';

// const RoomPage = () => {
//   const { roomCode } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const {
//     currentUser,
//     room: {
//       roomDetails,
//       status,
//       error,
//       joinStatus,
//       leaveStatus
//     }
//   } = useSelector((state) => ({
//     currentUser: state.auth?.user,
//     room: state.room
//   }));
//   console.log('this is currentUser', currentUser)
//   console.log('this is room:- ', room)

//   useEffect(() => {
//     dispatch(getAllRooms(roomCode));
//   }, [roomCode, dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   const handleJoin = () => {
//     if (!currentUser) {
//       toast.error('Please login to join rooms');
//       navigate('/login');
//       return;
//     }
//     dispatch(joinRoomRequest(roomCode));
//   };

//   const handleLeave = () => {
//     if (window.confirm('Are you sure you want to leave this room?')) {
//       dispatch(leaveRoom(roomDetails._id));
//     }
//   };

//   const handleRequestResponse = (requestId, response) => {
//     dispatch(handleJoinRequest({ 
//       roomId: roomDetails._id, 
//       requestId, 
//       response 
//     }));
//   };

//   const isCreator = roomDetails?.creator?._id === currentUser?._id;
//   const isMember = roomDetails?.members?.some(member => member.user._id === currentUser?._id);
//   const pendingRequest = roomDetails?.joinRequests?.find(
//     req => req.user._id === currentUser?._id && req.status === 'pending'
//   );

//   if (status === 'loading') {
//     return <Loader message="Loading room details..." />;
//   }

//   if (status === 'failed' || !roomDetails) {
//     return (
//       <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center">
//         <div className="text-xl">Room not found or error loading details</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-gray-300">
//       <div className="max-w-4xl mx-auto p-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-400 hover:text-white mb-6"
//         >
//           <FaChevronLeft className="mr-2" /> Back
//         </button>

//         {/* Room Header */}
//         <div className="flex flex-col md:flex-row gap-6 mb-8">
//           <div className="w-full md:w-1/3 flex justify-center">
//             <img
//               src={roomDetails.roomPic}
//               alt={roomDetails.name}
//               className="w-48 h-48 rounded-lg object-cover border-2 border-gray-700"
//             />
//           </div>
//           <div className="w-full md:w-2/3">
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-3xl font-bold">{roomDetails.name}</h1>
//               {isCreator && (
//                 <button 
//                   className="text-gray-400 hover:text-white"
//                   onClick={() => navigate(`/room/${roomCode}/settings`)}
//                 >
//                   <BsGearFill size={20} />
//                 </button>
//               )}
//             </div>
            
//             <div className="flex items-center mb-4">
//               <FaCode className="mr-2 text-gray-400" />
//               <span className="font-mono bg-gray-800 px-2 py-1 rounded">
//                 {roomDetails.roomCode}
//               </span>
//             </div>

//             <div className="flex items-center mb-4">
//               {roomDetails.settings?.isPrivate ? (
//                 <>
//                   <FaLock className="mr-2 text-gray-400" />
//                   <span>Private Room</span>
//                 </>
//               ) : (
//                 <>
//                   <FaUnlock className="mr-2 text-gray-400" />
//                   <span>Public Room</span>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center mb-6">
//               <FaGlobe className="mr-2 text-gray-400" />
//               <span>Language: {roomDetails.language}</span>
//             </div>

//             <div className="flex gap-4">
//               {!isMember && !pendingRequest && (
//                 <button
//                   onClick={handleJoin}
//                   disabled={joinStatus === 'loading'}
//                   className={`px-6 py-2 rounded-lg ${
//                     joinStatus === 'loading' 
//                       ? 'bg-gray-700' 
//                       : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   {joinStatus === 'loading' ? 'Processing...' : 'Join Room'}
//                 </button>
//               )}

//               {pendingRequest && (
//                 <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center">
//                   <FaEnvelope className="mr-2 text-yellow-400" />
//                   <span>Request Pending</span>
//                 </div>
//               )}

//               {isMember && (
//                 <>
//                   <button
//                     onClick={() => navigate(`/room/${roomCode}/collab`)}
//                     className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700"
//                   >
//                     Enter Room
//                   </button>
//                   {!isCreator && (
//                     <button
//                       onClick={handleLeave}
//                       disabled={leaveStatus === 'loading'}
//                       className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 flex items-center"
//                     >
//                       <FaSignOutAlt className="mr-2" />
//                       {leaveStatus === 'loading' ? 'Leaving...' : 'Leave Room'}
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Room Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-gray-900 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-semibold">Members</h3>
//                 <p className="text-gray-400">{roomDetails.members?.length || 0}</p>
//               </div>
//               <FaUser className="text-gray-400" size={24} />
//             </div>
//           </div>

//           {isCreator && (
//             <div className="bg-gray-900 p-4 rounded-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold">Join Requests</h3>
//                   <p className="text-gray-400">
//                     {roomDetails.joinRequests?.filter(req => req.status === 'pending').length || 0} pending
//                   </p>
//                 </div>
//                 <FaEnvelope className="text-gray-400" size={24} />
//               </div>
//             </div>
//           )}

//           <div className="bg-gray-900 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-semibold">Created</h3>
//                 <p className="text-gray-400">
//                   {new Date(roomDetails.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <FaUserShield className="text-gray-400" size={24} />
//             </div>
//           </div>
//         </div>

//         {/* Members Section */}
//         <div className="bg-gray-900 rounded-lg p-4 mb-6">
//           <h3 className="text-xl font-semibold mb-4">Members</h3>
//           {roomDetails.members?.length === 0 ? (
//             <p className="text-gray-400">No members yet</p>
//           ) : (
//             <div className="space-y-3">
//               {roomDetails.members?.map((member) => (
//                 <div key={member.user._id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
//                   <div className="flex items-center">
//                     <img
//                       src={member.user.avatar || 'https://via.placeholder.com/40'}
//                       alt={member.user.username}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                     <div>
//                       <p className="font-medium">{member.user.username}</p>
//                       <p className="text-sm text-gray-400">
//                         Joined: {new Date(member.joinedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   {member.isAdmin && (
//                     <span className="bg-blue-600 text-xs px-2 py-1 rounded">Admin</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Join Requests Section (for creator only) */}
//         {isCreator && roomDetails.joinRequests?.filter(req => req.status === 'pending').length > 0 && (
//           <div className="bg-gray-900 rounded-lg p-4 mb-6">
//             <h3 className="text-xl font-semibold mb-4">Pending Join Requests</h3>
//             <div className="space-y-3">
//               {roomDetails.joinRequests
//                 ?.filter(req => req.status === 'pending')
//                 .map((request) => (
//                   <div key={request._id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
//                     <div className="flex items-center">
//                       <img
//                         src={request.user.avatar || 'https://via.placeholder.com/40'}
//                         alt={request.user.username}
//                         className="w-10 h-10 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="font-medium">{request.user.username}</p>
//                         <p className="text-sm text-gray-400">
//                           Requested: {new Date(request.requestedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleRequestResponse(request._id, 'accepted')}
//                         className="bg-green-600 hover:bg-green-700 p-2 rounded-full"
//                         disabled={status === 'loading'}
//                       >
//                         <FaCheck />
//                       </button>
//                       <button
//                         onClick={() => handleRequestResponse(request._id, 'rejected')}
//                         className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
//                         disabled={status === 'loading'}
//                       >
//                         <FaTimes />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}

//         {/* Room Description */}
//         <div className="bg-gray-900 rounded-lg p-4">
//           <h3 className="text-xl font-semibold mb-2">About This Room</h3>
//           <p className="text-gray-300">
//             {roomDetails.description || 'No description provided.'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomPage;











// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllRooms, getParticularRoom } from '../redux/roomSlice';
// import { FaUser, FaUserShield, FaCode, FaLock, FaUnlock, FaChevronLeft } from 'react-icons/fa';
// import Loader from '../components/Loader';
// import JoinComponent from '../components/JoinComponent';

// const RoomPage = () => {
//   const { roomCode } = useParams();
//   console.log('this is frontend room code:-', roomCode)
//   const { state } = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Use passed data if available
//   const [initialData] = useState(state?.roomData);
//   const { particularRoom, status } = useSelector((state) => state.room);
  
//   // Only fetch if we didn't receive data via state
//   useEffect(() => {
//     if (!initialData && (!particularRoom || particularRoom.roomCode !== roomCode)) {
//       dispatch(getParticularRoom({roomCode}));
//     }
//   }, [roomCode, dispatch, initialData, particularRoom]);

//   // Combine passed data with fetched data
//   const room = initialData || 
//     (particularRoom?.roomCode === roomCode ? particularRoom : null);

//   if (!room) {
//     return <Loader message={status === 'loading' ? "Loading room..." : "Room not found"} />;
//   }

//   console.log('this is the particular room:- ', particularRoom)

//   return (
//     <div className="min-h-screen bg-black text-gray-300">
//       <div className="max-w-4xl mx-auto p-4">
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="flex items-center text-gray-400 hover:text-white mb-6"
//         >
//           <FaChevronLeft className="mr-2" /> Back to Dashboard
//         </button>

//         {/* Room Header */}
//         <div className="flex flex-col md:flex-row gap-6 mb-8">
//           <div className="w-full md:w-1/3 flex justify-center">
//             <img
//               src={room.roomPic}
//               alt={room.name}
//               className="w-48 h-48 rounded-lg object-cover border-2 border-gray-700"
//             />
//           </div>
//           <div className="w-full md:w-2/3">
//             <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            
//             <div className="flex items-center mb-4">
//               <FaCode className="mr-2 text-gray-400" />
//               <span className="font-mono bg-gray-800 px-2 py-1 rounded">
//                 {room.roomCode}
//               </span>
//             </div>

//             <div className="flex items-center mb-4">
//               {room.settings?.isPrivate ? (
//                 <>
//                   <FaLock className="mr-2 text-gray-400" />
//                   <span>Private Room</span>
//                 </>
//               ) : (
//                 <>
//                   <FaUnlock className="mr-2 text-gray-400" />
//                   <span>Public Room</span>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center mb-6">
//               <FaUserShield className="mr-2 text-gray-400" />
//               <span>Created by: {room.creator?.username || 'Admin'}</span>
//             </div>
//             <JoinComponent roomCode={room.roomCode}/>
//           </div>
//         </div>

//         {/* Members Section */}
//         <div className="bg-gray-900 rounded-lg p-4 mb-6">
//           <h3 className="text-xl font-semibold mb-4">Members ({room.members?.length || 0})</h3>
//           {room.members?.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {room.members.map((member) => (
                
//                 <div key={member._id} className="flex items-center bg-gray-800 p-3 rounded-lg">
//                     {console.log('this is the member:- ', member)}
//                   <img
//                     src={member.user.avatar || 'https://via.placeholder.com/40'}
//                     alt={member.username}
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <p className="font-medium">{member.username}</p>
//                     <p className="text-sm text-gray-400">
//                       {member.isAdmin ? 'Admin' : 'Member'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-400">No members yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomPage;

















import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRooms, getParticularRoom } from '../redux/roomSlice';
import { FaUser, FaUserShield, FaCode, FaLock, FaUnlock, FaChevronLeft, FaCodeBranch } from 'react-icons/fa';
import Loader from '../components/Loader';
import JoinComponent from '../components/JoinComponent';
import CollaborativeEditor from '../components/CollaborativeEditor';
import { useSocket } from '../context/SocketContext';

const RoomPage = () => {
  const { roomCode } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const socket = useSocket();
  
  // Use passed data if available
  const [initialData] = useState(state?.roomData);
  const { particularRoom, status } = useSelector((state) => state.room);
  
  // Only fetch if we didn't receive data via state
  useEffect(() => {
    if (!initialData && (!particularRoom || particularRoom.roomCode !== roomCode)) {
      dispatch(getParticularRoom({roomCode}));
    }
  }, [roomCode, dispatch, initialData, particularRoom]);

  // Combine passed data with fetched data
  const room = initialData || 
    (particularRoom?.roomCode === roomCode ? particularRoom : null);

  // Handle socket connection when entering editor
  useEffect(() => {
    if (isEditing && socket) {
      socket.emit('join_room', roomCode);
    }

    return () => {
      if (socket && isEditing) {
        socket.emit('leave_room', roomCode);
      }
    };
  }, [isEditing, socket, roomCode]);

  if (!room) {
    return <Loader message={status === 'loading' ? "Loading room..." : "Room not found"} />;
  }

  if (isEditing) {
    return <CollaborativeEditor roomId={room._id} roomCode={roomCode} onExit={() => setIsEditing(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <FaChevronLeft className="mr-2" /> Back to Dashboard
        </button>

        {/* Room Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={room.roomPic}
              alt={room.name}
              className="w-48 h-48 rounded-lg object-cover border-2 border-gray-700"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            
            <div className="flex items-center mb-4">
              <FaCode className="mr-2 text-gray-400" />
              <span className="font-mono bg-gray-800 px-2 py-1 rounded">
                {room.roomCode}
              </span>
            </div>

            <div className="flex items-center mb-4">
              {room.settings?.isPrivate ? (
                <>
                  <FaLock className="mr-2 text-gray-400" />
                  <span>Private Room</span>
                </>
              ) : (
                <>
                  <FaUnlock className="mr-2 text-gray-400" />
                  <span>Public Room</span>
                </>
              )}
            </div>

            <div className="flex items-center mb-6">
              <FaUserShield className="mr-2 text-gray-400" />
              <span>Created by: {room.creator?.username || 'Admin'}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <JoinComponent roomCode={room.roomCode} />
              
              {/* Add Editor Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                <FaCodeBranch className="mr-2" />
                Open Editor
              </button>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Members ({room.members?.length || 0})</h3>
          {room.members?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {room.members.map((member) => (
                <div key={member._id} className="flex items-center bg-gray-800 p-3 rounded-lg">
                  <img
                    src={member.user?.profilepic || member.profilepic || 'https://via.placeholder.com/40'}
                    alt={member.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{member.username || member.user?.username}</p>
                    <p className="text-sm text-gray-400">
                      {member.isAdmin ? 'Admin' : 'Member'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No members yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;