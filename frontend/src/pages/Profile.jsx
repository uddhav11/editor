import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/roomSlice";
import { getProfile } from "../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getRooms());
  }, [dispatch]);

    useEffect(() => {
       dispatch(getProfile())
    }, [dispatch])


  
    const { user } = useSelector((state) => state.auth);

  const { createdRooms, joinedRooms } = useSelector((state) => state.room);

  // console.log("this is   createdRooms:- ", createdRooms);
  // console.log("this is   joinedRooms:- ", joinedRooms);
  // console.log('this is user', user)

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 lg:px-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10">
        {/* <img
          src={user.profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg"
        /> */}
        <h2 className="text-2xl font-bold mt-4">{user?.username}</h2>
        <p className="text-gray-400">{user?.email}</p>
        <p className="text-sm text-gray-500">UserCode: {user?.userCode} </p>
        </div>

      {/* Invites & Requests Section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl">
          Invites
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl">
          Requests
        </button>
      </div>

      {/* Rooms Joined */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Rooms Joined</h3>
        <div className="space-y-2">
          {joinedRooms.map((room, index) => (
            <div
              key={index}
              className="bg-gray-800 py-2 px-4 rounded-lg shadow flex items-center space-x-3"
            >
              <span className="w-4 h-4 bg-green-400 rounded-full"></span>
              <p>{room?.roomCode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms Created */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Rooms Created</h3>
        <div className="space-y-2">
          {createdRooms.map((room, index) => (
            <div
              key={index}
              className="bg-gray-800 py-2 px-4 rounded-lg shadow flex items-center space-x-3"
            >
              <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              <p>{room?.roomCode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Change Profile Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Change Profile</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-400">Username</label>
            <input
              type="text"
              placeholder="New Username"
              className="w-full px-4 py-2 bg-gray-800 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-400">Profile Picture URL</label>
            <input
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-2 bg-gray-800 rounded-xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-xl"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
