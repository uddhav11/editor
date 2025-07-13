import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCode, clearOutput } from '../redux/executionSlice';

const useCodeExecution = (roomId) => {
  const dispatch = useDispatch();
  const { output, isLoading, error } = useSelector((state) => state.execution);
  const activeRoom = useSelector((state) => {
    const allRooms = [...state.room.createdRooms, ...state.room.joinedRooms];
    return allRooms.find((room) => room._id === roomId);
  });

  const handleRun = (code, stdin = '') => {
    if (!activeRoom) return;
    
    dispatch(executeCode({
      sourceCode: code,
      language: activeRoom.language || 'javascript',
      stdin,
      roomId
    }));
  };

  useEffect(() => {
    return () => {
      // Clear output when component unmounts
      dispatch(clearOutput());
    };
  }, [dispatch, roomId]);

  return {
    handleRun,
    output,
    isLoading,
    error,
    language: activeRoom?.language || 'javascript'
  };
};

export default useCodeExecution;