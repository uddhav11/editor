

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getJoinRequests, handleJoinRequest } from '../redux/roomSlice';
// import logo from '../assets/logo.png';

// const RoomRequestsPage = () => {
//   const { roomId } = useParams();
//   const dispatch = useDispatch();

//   const joinRequests = useSelector((state) => state.room.joinRequests);
//   const status = useSelector((state) => state.room.status);

//   useEffect(() => {
//     if (roomId) {
//       dispatch(getJoinRequests({ roomId }));
//     }
//   }, [dispatch, roomId]);

//   const handleRequestAction = (requestId, action) => {
//     dispatch(handleJoinRequest({ roomId, requestId, action }))
//       .then(() => dispatch(getJoinRequests({ roomId })));
//   };

//   console.log('Join Requests:', joinRequests);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Join Requests</h1>
//         <span className="text-neutral-400">
//           {joinRequests?.length || 0} pending requests
//         </span>
//       </div>

//       {status === 'loading' ? (
//         <div className="text-neutral-400">Loading...</div>
//       ) : joinRequests?.length === 0 ? (
//         <div className="bg-neutral-800 rounded-lg p-8 text-center">
//           <p className="text-neutral-400">No pending requests</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {joinRequests.map((request) => (
//             <div key={request._id} className="bg-neutral-800 p-4 rounded-lg">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={request.user?.profilepic || logo}
//                     alt="User"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div className='px-3'>
//                     <h3 className="text-xl capitalize font-bold text-white">{request.user?.username}</h3>
//                     <p className="text-sm text-neutral-400">{request.user?.userCode}</p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2 text-white font-bold">
//                   <button
//                     onClick={() => handleRequestAction(request._id, 'approve')}
//                     className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-lg"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleRequestAction(request._id, 'reject')}
//                     className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomRequestsPage;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getJoinRequests, handleJoinRequest } from '../redux/roomSlice';
import logo from '../assets/logo.png';

const RoomRequestsPage = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const joinRequests = useSelector((state) => state.room.joinRequests);
  const status = useSelector((state) => state.room.status);

  useEffect(() => {
    if (roomId) {
      dispatch(getJoinRequests({ roomId }));
    }
  }, [dispatch, roomId]);

  const handleRequestAction = (requestId, action) => {
    dispatch(handleJoinRequest({ roomId, requestId, action }))
      .then(() => dispatch(getJoinRequests({ roomId })));
  };

  return (
    <div className='w-full bg-gray-900 text-gray-200'>
      <div className="p-6 max-w-4xl mx-auto text-gray-200 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-100">Join Requests</h1>
          <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full">
            {joinRequests?.length || 0} pending
          </span>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-gray-700 rounded-full mb-2"></div>
            <p className="text-gray-500">Loading requests...</p>
          </div>
        </div>
      ) : joinRequests?.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-300">No pending requests</h3>
          <p className="mt-1 text-gray-500">When users request to join, they'll appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {joinRequests.map((request) => (
            <div key={request._id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={request.user?.profilepic || logo}
                      alt="User"
                      className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-blue-500 ring-2 ring-gray-800"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 capitalize">{request.user?.username}</h3>
                    <p className="text-sm text-gray-400">#{request.user?.userCode}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRequestAction(request._id, 'reject')}
                    className="px-4 py-2 bg-red-700 capitalize hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
                  >
                    reject
                  </button>
                  <button
                    onClick={() => handleRequestAction(request._id, 'accept')}
                    className="px-4 py-2 bg-blue-600 capitalize hover:bg-blue-700 rounded-md text-sm font-medium text-white transition-colors"
                  >
                    accept
                  </button>
                </div>
              </div>
              {request.message && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400 italic">"{request.message}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    
  );
};

export default RoomRequestsPage;
