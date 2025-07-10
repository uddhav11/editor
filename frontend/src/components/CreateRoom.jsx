// import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";

// const CreateRoom = ({ isSidebarOpen }) => {

//     const [createRoomModel, setCreateRoomModel]= useState(false)
//     const handleCreateRoom=() => {
//         setCreateRoomModel(!createRoomModel)
//         if(createRoomModel){
//             return (
//                 <div className="flex justify-center">
//                     <div className="w-100 h-100">
//                         this is the model
//                     </div>
//                 </div>
//             )
//         }
//     }
//   return (
//     <button
//           title={!isSidebarOpen ? "Create Room" : ""}

//       onClick={handleCreateRoom}
//       className="flex items-center space-x-2 text-green-400 hover:text-green-600 hover:cursor-pointer p-2"
//     >
//       <FaPlus className="text-xl" />
//       {isSidebarOpen && <span>Create Room</span>}
//     </button>
//   );
// };

// export default CreateRoom;

import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createRoom } from "../redux/roomSlice";

const CreateRoom = ({ isSidebarOpen }) => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [language, setLanguage] = useState("javascript");

  const modalRef = useRef();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setCreateRoomModal(!createRoomModal);
  };

  const closeModal = () => {
    setCreateRoomModal(false);
    setName("");
    setIsPrivate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Simulate room creation
    console.log("Room Created:", { name: name, isPrivate });
    const res = dispatch(createRoom({ name, isPrivate, language }));
    console.log("this is the createRoom output:", res);
    closeModal();
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        createRoomModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        closeModal();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [createRoomModal]);

  return (
    <>
      <button
        title={!isSidebarOpen ? "Create Room" : ""}
        onClick={toggleModal}
              className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg"
      >
        <FaPlus className="text-xl" />
        {isSidebarOpen && <span className="mx-2 font-bold">Create Room</span>}
      </button>

      {createRoomModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-neutral-900 p-6 rounded-xl w-80 shadow-lg text-white"
          >
            <h2 className="text-xl font-bold mb-4">Create a New Room</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <label className="text-sm block">
                Language
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="ruby">Ruby</option>
                  <option value="go">Go</option>
                </select>
              </label>

              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="accent-green-500"
                />
                <span>Private Room</span>
              </label>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRoom;
