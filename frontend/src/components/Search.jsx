import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../redux/roomSlice";

const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchMode, setSearchMode] = useState("advanced");
  const [input, setInput] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allRooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  // Handle room name filtering in "basic" mode
  useEffect(() => {
    if (searchMode === "basic" && input.trim()) {
      const results = allRooms.filter((room) =>
        room.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredRooms(results);
    } else {
      setFilteredRooms([]);
    }
  }, [input, searchMode, allRooms]);

  const handleSearch = () => {
    if (searchMode === "advanced" && input.trim()) {
      navigate(`/room/${input}`);
      setOpenModal(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRoomSelect = (roomCode) => {
    navigate(`/room/${roomCode}`);
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-4 hover:cursor-pointer"
      >
        <FaSearch className="size-6" />
        <span>Search</span>
      </button>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-neutral-900 w-full max-w-md p-6 rounded-xl shadow-lg text-white relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Search Room</h2>

            <div className="flex justify-center mb-4 space-x-4">
              <button
                className={`px-3 py-1 rounded-full ${
                  searchMode === "advanced" ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => setSearchMode("advanced")}
              >
                Advanced
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  searchMode === "basic" ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => setSearchMode("basic")}
              >
                Basic
              </button>
            </div>

            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 mb-4">
              <input
                type="text"
                placeholder={
                  searchMode === "advanced"
                    ? "Enter Room Code..."
                    : "Search by Room Name..."
                }
                className="bg-transparent flex-1 outline-none text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <FaSearch
                onClick={handleSearch}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
            </div>

            {searchMode === "basic" && (
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <div
                      key={room._id}
                      onClick={() => handleRoomSelect(room.roomCode)}
                      className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg cursor-pointer flex"
                    >
                      <div className=" ">
                        <img 
                          src={room?.roomPic} 
                          alt={room?.name} 
                          className="w-10 h-10 rounded-3xl mx-2"
                        />
                      </div>
                      <div>
                        <div className="font-bold">{room.name}</div>
                        <div className="text-sm text-gray-400">
                          Code: {room.roomCode}
                        </div>
                      </div>
                    </div>
                  ))
                ) : input.trim() ? (
                  <p className="text-gray-400 text-sm">No rooms found</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;


