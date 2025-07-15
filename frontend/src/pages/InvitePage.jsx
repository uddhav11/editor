import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites, getRooms, handleInvite } from "../redux/roomSlice";

const InvitesPage = () => {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.room.invites);
  const status = useSelector((state) => state.room.status);


  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!name.trim()) return;
  
  //     try {
  //       // Dispatch createRoom action and wait for it to complete
  //       const result = await dispatch(createRoom({ name, isPrivate, language }));
        
  //       // Only proceed if room creation was successful
  //       if (createRoom.fulfilled.match(result)) {
  //         // Refresh the rooms list
  //         await dispatch(getRooms());
  //         closeModal();
  //       }
  //     } catch (error) {
  //       console.error("Error creating room:", error);
  //     }
  //   };
  


  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  const handleAction = (inviteId, action) => {
    try {
      const result= dispatch(handleInvite({ inviteId, action }));
      if (handleInvite.fulfilled.match(result)) {
        // Optionally, you can refresh the invites list after handling the action
        dispatch(getRooms());
      }
    //   if (result.meta.requestStatus === 'fulfilled') {
    } catch (error) {
      console.error('Error in invite page:-', error)
    }
    // dispatch(handleInvite({ inviteId, action }));
  };

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Room Invitations</h1>
          <p className="text-gray-400">Manage your pending room invites</p>
        </div>

        {status === "loading" ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-32 bg-gray-800 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-800 rounded"></div>
            </div>
          </div>
        ) : !invites.length ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No pending invitations</div>
            <div className="text-gray-600 mt-2">You'll see new invites here when you receive them</div>
          </div>
        ) : (
          <div className="space-y-6">
            {invites.map((invite) => (
              <div
                key={invite._id}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg transition-all hover:border-gray-700"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <img
                        src={invite.roomId?.roomPic || "https://via.placeholder.com/120"}
                        alt="Room"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-gray-700"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {invite.roomId?.name || "Unnamed Room"}
                      </h3>
                      <div className="text-gray-400 text-sm space-y-1 mb-4">
                        <p>Room Code: <span className="text-gray-300 font-mono">{invite.roomId?.roomCode}</span></p>
                        <p>Invited by: <span className="text-gray-300">{invite.invitedBy?.username}</span></p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-4 font-bold">
                        <button
                          onClick={() => handleAction(invite._id, "accept")}
                          className="bg-emerald-600 hover:bg-emerald-800 px-5 py-2 rounded-lg text-white font-medium transition-colors duration-200"
                        >
                          Accept Invite
                        </button>
                        <button
                          onClick={() => handleAction(invite._id, "reject")}
                          className="bg-transparent hover:bg-red-800 hover:text-white px-5 py-2 rounded-lg text-red-500 border border-red-700 hover:border-gray-600 font-medium transition-colors duration-200"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitesPage;