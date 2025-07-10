import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { joinRoomRequest } from '../redux/roomSlice';

const JoinComponent = ({ roomCode }) => {
  const dispatch = useDispatch();
  const { joinRequestStatus, joinRequestMessage } = useSelector((state) => state.room);

  const handleJoin = () => {
    dispatch(joinRoomRequest({ roomCode }));
  };

  useEffect(() => {
    if (joinRequestStatus === 'succeeded') {
      toast.success(joinRequestMessage || 'Join request sent!', {
        position: 'top-left',
      });
    } else if (joinRequestStatus === 'failed') {
      toast.error(joinRequestMessage || 'Failed to send request', {
        position: 'top-left',
      });
    }
  }, [joinRequestStatus, joinRequestMessage]);

  return (
    <div>
      <button
        className="px-5 py-2 border border-white text-white font-bold rounded-xl text-xl"
        onClick={handleJoin}
      >
        Join
      </button>
      <Toaster position="top-left" />
    </div>
  );
};

export default JoinComponent;
