import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInvite } from '../redux/roomSlice';

const InvitesPage = () => {
  const dispatch = useDispatch();
  const { invites } = useSelector(state => state.room);

  const handleResponse = (inviteId, action) => {
    dispatch(handleInvite({ inviteId, action }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Invites</h1>
      
      {invites.length === 0 ? (
        <div className="bg-neutral-800 rounded-lg p-8 text-center">
          <p className="text-neutral-400">You have no pending invites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invites.map(invite => (
            <div key={invite._id} className="bg-neutral-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={invite.roomPic || logo} 
                  alt="Room" 
                  className="w-10 h-10 rounded-full" 
                />
                <div>
                  <h3 className="font-medium">{invite.roomName}</h3>
                  <p className="text-sm text-neutral-400">
                    Invited by: {invite.invitedBy.username}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleResponse(invite._id, 'accept')}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(invite._id, 'reject')}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitesPage;