// // // the name of the service is NexusCode

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { getProfile, logout, logoutUser } from "../redux/authSlice";
// import logo from "../assets/logo.png";
// import { FcInvite } from "react-icons/fc";
// import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
// import Logout from "../components/Logout";
// import CreateRoom from "../components/CreateRoom";
// import LeaveRoom from "../components/LeaveRoom";
// import Invites from "../components/Invites";
// import RoomRequests from "../components/RoomRequests";
// import Search from "../components/Search";
// import { getRooms } from "../redux/roomSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   710737;

//   // const localUser = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     dispatch(getProfile());
//     dispatch(getRooms());
//   }, [dispatch]);

//   const { user } = useSelector((state) => state.auth);
//   const { createdRooms, joinedRooms } = useSelector((state) => state.room);
//   console.log(user?.email);

//   const toogleSidebar = (e) => {
//     e.preventDefault();
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-800">
//       {/* Header */}
//       <div className="h-15 text-white py-4 px-8 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Logo" className="w-15 h-10 rounded-2xl" />
//           <h2>NexusCode</h2>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Invites />
//           <Search />
//           <Link
//             to="/profile"
//             className="capitalize flex items-center space-x-2"
//           >
//             <img
//               src={user?.profilepic}
//               alt="Profile"
//               className="rounded-full px-1"
//             />
//             <span>{user?.username}</span>
//           </Link>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="flex h-[calc(100vh-80px)]">
//         {/* Sidebar */}
//         <div
//           className={`${
//             sidebarOpen ? "w-70" : "w-20"
//           } h-full text-white transition-all duration-300 p-3 ${
//             sidebarOpen ? "bg-neutral-900" : "bg-neutral-800"
//           } flex flex-col rounded-xl`}
//         >
//           {/* Sidebar Toggle Button */}
//           <div>
//             <button onClick={toogleSidebar} className="self-end">
//               {sidebarOpen ? (
//                 <GoSidebarCollapse className="size-8 hover:cursor-pointer" />
//               ) : (
//                 <GoSidebarExpand className="size-8 hover:cursor-pointer" />
//               )}
//             </button>
//           </div>

//           {/* Sidebar Content */}
//           <div className="flex flex-col justify-between flex-1 w-full mt-4">
//             {!sidebarOpen ? (
//               <>
//                 {createdRooms.map((room, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col items-center space-y-4"
//                   >
//                     <img
//                       src={room?.roomPic}
//                       alt="practice"
//                       className="w-12 h-12 rounded-full"
//                     />
//                   </div>
//                 ))}

//                 <div className="flex flex-col items-center space-y-2">
//                   <Logout isSidebarOpen={sidebarOpen} />
//                   <CreateRoom isSidebarOpen={sidebarOpen} />
//                 </div>
//               </>
//             ) : (
//               <>
//                 {createdRooms.map((room, index) => (
//                   <div key={index} className="space-y-4 flex">
//                     <img
//                       src={room?.roomPic}
//                       alt="practice"
//                       className="w-12 h-12 rounded-full"
//                     />
//                     <h2 className="px-2 py-3 capitalize font-bold text-md">
//                       {room?.name}
//                     </h2>
//                   </div>
//                 ))}

//                 <div className="text-center mb-2 space-y-2">
//                   <Logout isSidebarOpen={sidebarOpen} />
//                   <CreateRoom isSidebarOpen={sidebarOpen} />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div
//           className={`text-white lg:w-[60%] w-full h-auto ${
//             sidebarOpen ? "bg-neutral-900/50" : "bg-neutral-900/80"
//           } rounded-2xl flex mx-auto`}
//         >
//           <div className="flex justify-between items-start px-5 py-3 w-full">
//             <div className="flex items-center space-x-5">
//               <img
//                 src={logo}
//                 alt="room picture"
//                 className="w-12 h-12 rounded-full"
//               />
//               <span className="text-xl font-bold">Room name</span>
//             </div>
//             <div className="flex">
//               <RoomRequests />
//               <button className="border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 hover:cursor-pointer">
//                 <FcInvite className="size-7" />
//                 <span>Invite</span>
//               </button>
//               <LeaveRoom />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getProfile, logoutUser } from "../redux/authSlice";
// import logo from "../assets/logo.png";
// import { FcInvite, FcSettings } from "react-icons/fc";
// import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
// import { FiMenu, FiPlus } from "react-icons/fi";
// import Logout from "../components/Logout";
// import CreateRoom from "../components/CreateRoom";
// import LeaveRoom from "../components/LeaveRoom";
// import Invites from "../components/Invites";
// import RoomRequests from "../components/RoomRequests";
// import Search from "../components/Search";
// import { getRooms } from "../redux/roomSlice";
// import CodeEditor from "../components/CodeEditor";
// import InviteModal from "../components/InviteModal";
// import usePersistentCode from "../components/usePersistentCode";
// import Run from "../components/Run";
// import MonacoEditor from "@monaco-editor/react";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { roomId } = useParams();
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const { code, handleCodeChange } = usePersistentCode(roomId);

//   const { user } = useSelector((state) => state.auth);
//   const { createdRooms, joinedRooms, invites } = useSelector(
//     (state) => state.room
//   );
//   const allRooms = [...createdRooms, ...joinedRooms];
//   const activeRoom = allRooms.find((room) => room._id === roomId);

//   useEffect(() => {
//     dispatch(getProfile());
//     dispatch(getRooms());
//   }, [dispatch]);

//   const handleRoomClick = (room) => {
//     navigate(`/dashboard/${room._id}`);
//     if (window.innerWidth < 768) {
//       setMobileSidebarOpen(false);
//     }
//   };



//   const handleInviteClick = () => {
//     if (!activeRoom) return;
//     setShowInviteModal(true);
//   };

//   const toggleSidebar = (e) => {
//     e.preventDefault();
//     if (window.innerWidth < 768) {
//       setMobileSidebarOpen(!mobileSidebarOpen);
//     } else {
//       setDesktopSidebarOpen(!desktopSidebarOpen);
//     }
//   };

//   const isMobile = window.innerWidth < 768;

//   const handleRun=() => {

//   }

//   return (
//     <div className="min-h-screen bg-neutral-800 text-white">
//       {/* Mobile Header */}
//       <header className="md:hidden flex justify-between items-center p-4 border-b border-neutral-700">
//         <button onClick={toggleSidebar}>
//           <FiMenu className="text-2xl" />
//         </button>
//         <Link to="/dashboard" className="text-xl font-bold">
//           NexusCode
//         </Link>
//         <div className="flex items-center space-x-3">
//           <Link to="/dashboard/invites" className="relative">
//             <Invites />
//             {invites.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {invites.length}
//               </span>
//             )}
//           </Link>
//           <Link to="/dashboard/profile">
//             <img
//               src={user?.profilepic || logo}
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//           </Link>
//         </div>
//       </header>

//       {/* Desktop Header */}
//       <header className="hidden md:flex justify-between items-center p-4 border-b border-neutral-700">
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Logo" className="w-10 h-10" />
//           <h1 className="text-xl font-bold">NexusCode</h1>
//         </div>
//         <div className="flex items-center space-x-6">
//           <Search />
//           <Link to="/dashboard/invites" className="relative">
//             <Invites />
//             {invites.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {invites.length}
//               </span>
//             )}
//           </Link>
//           <Link to="/dashboard/profile" className="flex items-center space-x-2">
//             <img
//               src={user?.profilepic || logo}
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//             <span>{user?.username}</span>
//           </Link>
//         </div>
//       </header>

//       <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
//         {/* Mobile Sidebar */}
//         {mobileSidebarOpen && (
//           <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
//             <div className="w-72 h-full bg-neutral-900 p-4 flex flex-col">
//               <SidebarContent
//                 rooms={joinedRooms}
//                 activeRoomId={roomId}
//                 onRoomClick={handleRoomClick}
//                 onClose={() => setMobileSidebarOpen(false)}
//                 isMobile={true}
//               />
//             </div>
//           </div>
//         )}

//         {/* Desktop Sidebar */}
//         <div
//           className={`hidden md:block ${
//             desktopSidebarOpen ? "w-72" : "w-20"
//           } bg-neutral-900 transition-all duration-300`}
//         >
//           <SidebarContent
//             rooms={joinedRooms}
//             activeRoomId={roomId}
//             onRoomClick={handleRoomClick}
//             isCollapsed={!desktopSidebarOpen}
//             onToggleCollapse={toggleSidebar}
//             isMobile={false}
//           />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 overflow-hidden bg-neutral-800">
//           {!roomId ? (
//             <EmptyState onCreateRoom={() => navigate("/dashboard/create")} />
//           ) : (
//             <div className="h-full flex flex-col">
//               {/* Room Header */}
//               <div className="w-full border-b border-neutral-700">
//                 <RoomHeader
//                   room={activeRoom}
//                   onInviteClick={handleInviteClick}
//                   user={user}
//                 />
//               </div>

//               {/* Code Editor + Output */}
//               <div className="flex flex-1 h-full">
//                 {/* Code Editor - 60% */}
//                 <div className="w-full md:w-[60%] border-r border-neutral-700">
//                   {/* <CodeEditor
//                     code={code}
//                     language={activeRoom?.language || "javascript"}
//                   /> */}
//                   <MonacoEditor
//                     height="100%"
//                     language={activeRoom?.language || "javascript"}
//                     theme="vs-dark"
//                     value={code || "// Start coding here..."}
//                     options={{
//                       automaticLayout: true,
//                       fontSize: 14,
//                       minimap: { enabled: false },
//                     }}
//                   />
//                 </div>

//                 {/* Output - 40% */}
//                 <div className="hidden md:block w-[40%] bg-neutral-900 text-white p-4 overflow-y-auto">
//                   <div className="flex h-15">
//                     <h2 className="text-lg font-bold mb-2 border-b border-neutral-700 pb-2">
//                       Output
//                     </h2>
//                     <div>
//                       <button
//                         className="border hover:bg-green-400 hover:text-black hover:cursor-pointer text-white font-bold px-6 py-1 rounded-xl mx-3 mb-3 bg-green-600"
//                         onClick={handleRun}
//                       >
//                         Run
//                       </button>
//                     </div>
//                   </div>

//                   <div className="text-sm text-neutral-400 italic">
//                     {/* You can later bind this to actual execution output */}
//                     Output will be displayed here...
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Invite Modal */}
//       {showInviteModal && activeRoom && (
//         <InviteModal
//           roomId={activeRoom._id}
//           onClose={() => setShowInviteModal(false)}
//         />
//       )}
//     </div>
//   );
// };


// Sidebar Component
// const SidebarContent = ({
//   rooms,
//   activeRoomId,
//   onRoomClick,
//   isCollapsed = false,
//   onToggleCollapse,
//   onClose,
//   isMobile,
// }) => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Sidebar Header */}
//       <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
//         {!isCollapsed && <h2 className="text-lg font-bold">Your Rooms</h2>}
//         <button
//           onClick={onToggleCollapse || onClose}
//           className="text-neutral-400 hover:text-white"
//         >
//           {isMobile ? (
//             <GoSidebarCollapse className="text-xl" onClick={onClose} />
//           ) : isCollapsed ? (
//             <GoSidebarExpand className="text-xl" />
//           ) : (
//             <GoSidebarCollapse className="text-xl" />
//           )}
//         </button>
//       </div>

//       {/* Room List */}
//       <div className="flex-1 overflow-y-auto py-2">
//         {rooms.map((room) => (
//           <button
//             key={room._id}
//             onClick={() => onRoomClick(room)}
//             className={`flex items-center p-3 mx-2 rounded-lg w-full text-left ${
//               activeRoomId === room._id ? "bg-blue-600" : "hover:bg-neutral-700"
//             }`}
//           >
//             <img
//               src={room.roomPic || logo}
//               alt={room.name}
//               className="w-8 h-8 rounded-full flex-shrink-0"
//             />
//             {!isCollapsed && (
//               <div className="ml-3 overflow-hidden">
//                 <p className="font-medium truncate">{room.name}</p>
//                 <p className="text-xs text-neutral-400 truncate">
//                   {room.members?.length || 0} members
//                 </p>
//               </div>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Bottom Buttons */}
//       <div className="p-3 border-t border-neutral-700 space-y-2">
//         {!isCollapsed && (
//           <>
//             <Link
//               to="/dashboard/invites"
//               className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-700"
//             >
//               <FcInvite className="text-xl mr-3" />
//               <span className="font-bold">Invites</span>
//             </Link>
//             {/* <Link
//               to="/dashboard/create"
//               className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg"
//             >
//               <FiPlus className="mr-2" />
//               Create Room
//             </Link> */}
//             <CreateRoom isSidebarOpen={!isMobile} />
//           </>
//         )}
//         {isCollapsed && (
//           <>
//             {/* <Link
//           title="Create Room"
//             to="/dashboard/create"
//             className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg"
//           >
//             <FiPlus />
//           </Link> */}
//             <CreateRoom isSidebarOpen={isMobile} />
//           </>
//         )}

//         <Logout isSidebarOpen={!isCollapsed} />
//       </div>
//     </>
//   );
// };

// // Room Header Component
// const RoomHeader = ({ room, onInviteClick, user }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-between items-center p-4 border-b border-neutral-700">
//       <div className="flex items-center space-x-4">
//         <img
//           src={room?.roomPic || logo}
//           alt="Room"
//           className="w-10 h-10 rounded-full"
//         />
//         <div>
//           <h2 className="font-bold">{room?.name}</h2>
//           <p className="text-sm text-neutral-400">Code: {room?.roomCode}</p>
//         </div>
//       </div>
//       <div className="flex space-x-3">
//         <button
//           onClick={() => navigate(`/dashboard/${room._id}/requests`)}
//           className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 rounded-lg text-sm"
//         >
//           Requests
//         </button>

//         <button
//           onClick={onInviteClick}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
//         >
//           <FcInvite />
//           <span>Invite</span>
//         </button>
//         <button
//           onClick={() => navigate(`/dashboard/${room._id}/settings`)}
//           className="p-2 rounded-lg hover:bg-neutral-700"
//         >
//           <FcSettings />
//         </button>
//         <LeaveRoom roomId={room?._id} />
//       </div>
//     </div>
//   );
// };

// // Empty State Component
// const EmptyState = ({ onCreateRoom }) => {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <div className="text-center p-6 max-w-md">
//         <h2 className="text-2xl font-bold mb-4">No Room Selected</h2>
//         <p className="text-neutral-400 mb-6">
//           Select a room from the sidebar or create a new one to start
//           collaborating
//         </p>
//         <button
//           onClick={onCreateRoom}
//           className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
//         >
//           Create New Room
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getProfile } from "../redux/authSlice";
// import logo from "../assets/logo.png";
// import { FcInvite, FcSettings } from "react-icons/fc";
// import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
// import { FiMenu } from "react-icons/fi";
// import Logout from "../components/Logout";
// import CreateRoom from "../components/CreateRoom";
// import LeaveRoom from "../components/LeaveRoom";
// import Invites from "../components/Invites";
// import Search from "../components/Search";
// import { getRooms } from "../redux/roomSlice";
// import MonacoEditor from "@monaco-editor/react";
// import useCodeExecution from "../components/useCodeExecution";
// import OutputDisplay from "../components/OutputDisplay";
// import InviteModal from "../components/InviteModal";
// // import RoomSettingsModal from "../components/RoomSettingsModal";
// import { getRoomSubmissions } from "../redux/executionSlice";
// import SubmissionsHistory from "../components/SubmissionHistory";
// import { BsCodeSlash, BsTerminal } from "react-icons/bs";
// import { IoMdTime } from "react-icons/io";
// import CodeEditor from "../components/CodeEditor";
// import { RoomProvider } from "../context/RoomContext";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { roomId } = useParams();
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("output");
//   const [code, setCode] = useState("");
//   const [stdin, setStdin] = useState("");

//   const { user } = useSelector((state) => state.auth);
//   const { createdRooms, joinedRooms, invites } = useSelector(
//     (state) => state.room
//   );
//   const { submissions } = useSelector((state) => state.execution);
  
//   const { handleRun, output, isLoading, language } = useCodeExecution(roomId);
//   const allRooms = [...createdRooms, ...joinedRooms];
//   const activeRoom = allRooms.find((room) => room._id === roomId);

//   useEffect(() => {
//     dispatch(getProfile());
//     dispatch(getRooms());
//   }, [dispatch]);

//   useEffect(() => {
//     if (activeRoom?.code) {
//       setCode(activeRoom.code);
//     }
//   }, [activeRoom]);

//   useEffect(() => {
//     if (roomId) {
//       dispatch(getRoomSubmissions(roomId));
//     }
//   }, [dispatch, roomId]);

//   const handleRoomClick = (room) => {
//     navigate(`/dashboard/${room._id}`);
//     if (window.innerWidth < 768) {
//       setMobileSidebarOpen(false);
//     }
//   };

//   const handleInviteClick = () => {
//     if (!activeRoom) return;
//     setShowInviteModal(true);
//   };

//   const handleSettingsClick = () => {
//     if (!activeRoom) return;
//     setShowSettingsModal(true);
//   };

//   const toggleSidebar = (e) => {
//     e.preventDefault();
//     if (window.innerWidth < 768) {
//       setMobileSidebarOpen(!mobileSidebarOpen);
//     } else {
//       setDesktopSidebarOpen(!desktopSidebarOpen);
//     }
//   };

//   const handleEditorChange = (value) => {
//     setCode(value);
//   };

//   const handleStdinChange = (e) => {
//     setStdin(e.target.value);
//   };

//   const isMobile = window.innerWidth < 768;

//   return (
//     <div className="min-h-screen bg-neutral-800 text-white">
//       {/* Mobile Header */}
//       <header className="md:hidden flex justify-between items-center p-4 border-b border-neutral-700">
//         <button onClick={toggleSidebar}>
//           <FiMenu className="text-2xl" />
//         </button>
//         <Link to="/dashboard" className="text-xl font-bold">
//           CodeCollab
//         </Link>
//         <div className="flex items-center space-x-3">
//           <Link to="/dashboard/invites" className="relative">
//             <Invites />
//             {invites.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {invites.length}
//               </span>
//             )}
//           </Link>
//           <Link to="/dashboard/profile">
//             <img
//               src={user?.profilepic || logo}
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//           </Link>
//         </div>
//       </header>

//       {/* Desktop Header */}
//       <header className="hidden md:flex justify-between items-center p-4 border-b border-neutral-700">
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Logo" className="w-10 h-10" />
//           <h1 className="text-xl font-bold">CodeCollab</h1>
//         </div>
//         <div className="flex items-center space-x-6">
//           <Search />
//           <Link to="/dashboard/invites" className="relative">
//             <Invites />
//             {invites.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {invites.length}
//               </span>
//             )}
//           </Link>
//           <Link to="/dashboard/profile" className="flex items-center space-x-2">
//             <img
//               src={user?.profilepic || logo}
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//             <span>{user?.username}</span>
//           </Link>
//         </div>
//       </header>

//       <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
//         {/* Mobile Sidebar */}
//         {mobileSidebarOpen && (
//           <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
//             <div className="w-72 h-full bg-neutral-900 p-4 flex flex-col">
//               <SidebarContent
//                 rooms={joinedRooms}
//                 activeRoomId={roomId}
//                 onRoomClick={handleRoomClick}
//                 onClose={() => setMobileSidebarOpen(false)}
//                 isMobile={true}
//               />
//             </div>
//           </div>
//         )}

//         {/* Desktop Sidebar */}
//         <div
//           className={`hidden md:block ${
//             desktopSidebarOpen ? "w-72" : "w-20"
//           } bg-neutral-900 transition-all duration-300`}
//         >
//           <SidebarContent
//             rooms={joinedRooms}
//             activeRoomId={roomId}
//             onRoomClick={handleRoomClick}
//             isCollapsed={!desktopSidebarOpen}
//             onToggleCollapse={toggleSidebar}
//             isMobile={false}
//           />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 overflow-hidden bg-neutral-800">
//           {!roomId ? (
//             <EmptyState onCreateRoom={() => navigate("/dashboard/create")} />
//           ) : (
//             <div className="h-full flex flex-col">
//               {/* Room Header */}
//               <div className="w-full border-b border-neutral-700">
//                 <RoomHeader
//                   room={activeRoom}
//                   onInviteClick={handleInviteClick}
//                   onSettingsClick={handleSettingsClick}
//                   user={user}
//                 />
//               </div>
              

//               {/* Code Editor + Output */}
//               <div className="flex flex-1 h-full flex-col md:flex-row">
//                 {/* Code Editor - 60% */}
//                 <RoomProvider roomId={roomId} >
//                 <div className="w-full md:w-[60%] border-r border-neutral-700">
//                   <CodeEditor roomId={roomId}/>
//                 </div>
//                 </RoomProvider>

//                 {/* Output Panel - 40% */}
//                 <div className="w-full md:w-[40%] bg-neutral-900 text-white flex flex-col">
//                   {/* Output Tabs */}
//                   <div className="flex border-b border-neutral-700">
//                     <button
//                       className={`flex items-center px-4 py-3 text-sm font-medium ${
//                         activeTab === "output"
//                           ? "border-b-2 border-blue-500 text-blue-400"
//                           : "text-neutral-400 hover:text-white"
//                       }`}
//                       onClick={() => setActiveTab("output")}
//                     >
//                       <BsTerminal className="mr-2" />
//                       Output
//                     </button>
//                     <button
//                       className={`flex items-center px-4 py-3 text-sm font-medium ${
//                         activeTab === "history"
//                           ? "border-b-2 border-blue-500 text-blue-400"
//                           : "text-neutral-400 hover:text-white"
//                       }`}
//                       onClick={() => setActiveTab("history")}
//                     >
//                       <IoMdTime className="mr-2" />
//                       History
//                     </button>
//                   </div>

//                   {/* Tab Content */}
//                   <div className="flex-1 overflow-y-auto p-4">
//                     {activeTab === "output" ? (
//                       <>
//                         <div className="flex justify-between items-center mb-4">
//                           <h2 className="text-lg font-bold">Execution</h2>
//                           <button
//                             className={`border font-bold px-6 py-1 rounded-xl ${
//                               isLoading
//                                 ? "bg-gray-600 cursor-not-allowed"
//                                 : "bg-green-600 hover:bg-green-700 cursor-pointer"
//                             }`}
//                             onClick={() => handleRun(code, stdin)}
//                             disabled={isLoading}
//                           >
//                             {isLoading ? "Running..." : "Run"}
//                           </button>
//                         </div>

//                         <div className="mb-4">
//                           <label className="block text-sm font-medium mb-1">
//                             Standard Input
//                           </label>
//                           <textarea
//                             value={stdin}
//                             onChange={handleStdinChange}
//                             className="w-full bg-neutral-800 text-white p-2 rounded border border-neutral-700"
//                             rows={3}
//                             placeholder="Enter input (if needed)"
//                           />
//                         </div>

//                         <OutputDisplay output={output} isLoading={isLoading} />
//                       </>
//                     ) : (
//                       <SubmissionsHistory submissions={submissions} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Invite Modal */}
//       {showInviteModal && activeRoom && (
//         <InviteModal
//           roomId={activeRoom._id}
//           onClose={() => setShowInviteModal(false)}
//         />
//       )}

//       {/* Settings Modal */}
//       {showSettingsModal && activeRoom && (
//         <RoomSettingsModal
//           room={activeRoom}
//           onClose={() => setShowSettingsModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// // Sidebar Component
// const SidebarContent = ({
//   rooms,
//   activeRoomId,
//   onRoomClick,
//   isCollapsed = false,
//   onToggleCollapse,
//   onClose,
//   isMobile,
// }) => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Sidebar Header */}
//       <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
//         {!isCollapsed && <h2 className="text-lg font-bold">Your Rooms</h2>}
//         <button
//           onClick={onToggleCollapse || onClose}
//           className="text-neutral-400 hover:text-white"
//         >
//           {isMobile ? (
//             <GoSidebarCollapse className="text-xl" onClick={onClose} />
//           ) : isCollapsed ? (
//             <GoSidebarExpand className="text-xl" />
//           ) : (
//             <GoSidebarCollapse className="text-xl" />
//           )}
//         </button>
//       </div>

//       {/* Room List */}
//       <div className="flex-1 overflow-y-auto py-2">
//         {rooms.map((room) => (
//           <button
//             key={room._id}
//             onClick={() => onRoomClick(room)}
//             className={`flex items-center p-3 mx-2 rounded-lg w-full text-left ${
//               activeRoomId === room._id ? "bg-blue-600" : "hover:bg-neutral-700"
//             }`}
//           >
//             <img
//               src={room.roomPic || logo}
//               alt={room.name}
//               className="w-8 h-8 rounded-full flex-shrink-0"
//             />
//             {!isCollapsed && (
//               <div className="ml-3 overflow-hidden">
//                 <p className="font-medium truncate">{room.name}</p>
//                 <p className="text-xs text-neutral-400 truncate">
//                   {room.members?.length || 0} members
//                 </p>
//               </div>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Bottom Buttons */}
//       <div className="p-3 border-t border-neutral-700 space-y-2">
//         {!isCollapsed && (
//           <>
//             <Link
//               to="/dashboard/invites"
//               className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-700"
//             >
//               <FcInvite className="text-xl mr-3" />
//               <span className="font-bold">Invites</span>
//             </Link>
//             <CreateRoom isSidebarOpen={!isMobile} />
//           </>
//         )}
//         {isCollapsed && <CreateRoom isSidebarOpen={isMobile} />}
//         <Logout isSidebarOpen={!isCollapsed} />
//       </div>
//     </>
//   );
// };

// // Room Header Component
// const RoomHeader = ({ room, onInviteClick, onSettingsClick, user }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-between items-center p-4 border-b border-neutral-700">
//       <div className="flex items-center space-x-4">
//         <Link to={`/room/${room.roomCode}`}>
//         <img
//           src={room?.roomPic || logo}
//           alt="Room"
//           className="w-10 h-10 rounded-full"
//         /></Link>
//         <div>
//           <h2 className="font-bold">{room?.name}</h2>
//           <p className="text-sm text-neutral-400">Code: {room?.roomCode}</p>
//         </div>
//       </div>
//       <div className="flex space-x-3">
//         <button
//           onClick={() => navigate(`/dashboard/${room._id}/requests`)}
//           className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 rounded-lg text-sm"
//         >
//           Requests
//         </button>

//         <button
//           onClick={onInviteClick}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
//         >
//           <FcInvite />
//           <span>Invite</span>
//         </button>
//         <button
//           onClick={onSettingsClick}
//           className="p-2 rounded-lg hover:bg-neutral-700"
//         >
//           <FcSettings />
//         </button>
//         <LeaveRoom roomId={room?._id} />
//       </div>
//     </div>
//   );
// };

// // Empty State Component
// const EmptyState = ({ onCreateRoom }) => {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <div className="text-center p-6 max-w-md">
//         <h2 className="text-2xl font-bold mb-4">No Room Selected</h2>
//         <p className="text-neutral-400 mb-6">
//           Select a room from the sidebar or create a new one to start
//           collaborating
//         </p>
//         <button
//           onClick={onCreateRoom}
//           className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
//         >
//           Create New Room
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../redux/authSlice";
import logo from "../assets/logo.png";
import { FcInvite, FcSettings } from "react-icons/fc";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import Logout from "../components/Logout";
import CreateRoom from "../components/CreateRoom";
import LeaveRoom from "../components/LeaveRoom";
import Invites from "../components/Invites";
import Search from "../components/Search";
import { getRooms } from "../redux/roomSlice";
import CodeEditor from "../components/CodeEditor";
import { RoomProvider } from "../context/RoomContext";
import InviteModal from "../components/InviteModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { createdRooms, joinedRooms, invites } = useSelector(
    (state) => state.room
  );

  const allRooms = [...createdRooms, ...joinedRooms];
  const activeRoom = allRooms.find((room) => room._id === roomId);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getRooms());
  }, [dispatch]);

  const handleRoomClick = (room) => {
    navigate(`/dashboard/${room._id}`);
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(false);
    }
  };

  const handleInviteClick = () => {
    if (!activeRoom) return;
    setShowInviteModal(true);
  };

  const handleSettingsClick = () => {
    if (!activeRoom) return;
    setShowSettingsModal(true);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-neutral-800 text-white">
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4 border-b border-neutral-700">
        <button onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
        </button>
        <Link to="/dashboard" className="text-xl font-bold">
          CodeCollab
        </Link>
        <div className="flex items-center space-x-3">
          <Link to="/dashboard/invites" className="relative">
            <Invites />
            {invites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {invites.length}
              </span>
            )}
          </Link>
          <Link to="/dashboard/profile">
            <img
              src={user?.profilepic || logo}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center p-4 border-b border-neutral-700">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">CodeCollab</h1>
        </div>
        <div className="flex items-center space-x-6">
          <Search />
          <Link to="/dashboard/invites" className="relative">
            <Invites />
            {invites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {invites.length}
              </span>
            )}
          </Link>
          <Link to="/dashboard/profile" className="flex items-center space-x-2">
            <img
              src={user?.profilepic || logo}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>{user?.username}</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="w-72 h-full bg-neutral-900 p-4 flex flex-col">
              <SidebarContent
                rooms={joinedRooms}
                activeRoomId={roomId}
                onRoomClick={handleRoomClick}
                onClose={() => setMobileSidebarOpen(false)}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div
          className={`hidden md:block ${
            desktopSidebarOpen ? "w-72" : "w-20"
          } bg-neutral-900 transition-all duration-300`}
        >
          <SidebarContent
            rooms={joinedRooms}
            activeRoomId={roomId}
            onRoomClick={handleRoomClick}
            isCollapsed={!desktopSidebarOpen}
            onToggleCollapse={toggleSidebar}
            isMobile={false}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-neutral-800">
          {!roomId ? (
            <EmptyState onCreateRoom={() => navigate("/dashboard/create")} />
          ) : (
            <div className="h-full flex flex-col">
              {/* Room Header */}
              <div className="w-full border-b border-neutral-700">
                <RoomHeader
                  room={activeRoom}
                  onInviteClick={handleInviteClick}
                  onSettingsClick={handleSettingsClick}
                  user={user}
                />
              </div>

              {/* Code Editor with Output - now fully handled by CodeEditor */}
              <RoomProvider roomId={roomId}>
                <CodeEditor roomId={roomId} />
              </RoomProvider>
            </div>
          )}
        </main>
      </div>

      {/* Invite Modal */}
      {showInviteModal && activeRoom && (
        <InviteModal
          roomId={activeRoom._id}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && activeRoom && (
        <RoomSettingsModal
          room={activeRoom}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};

// Sidebar Component
const SidebarContent = ({
  rooms,
  activeRoomId,
  onRoomClick,
  isCollapsed = false,
  onToggleCollapse,
  onClose,
  isMobile,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-bold">Your Rooms</h2>}
        <button
          onClick={onToggleCollapse || onClose}
          className="text-neutral-400 hover:text-white"
        >
          {isMobile ? (
            <GoSidebarCollapse className="text-xl" onClick={onClose} />
          ) : isCollapsed ? (
            <GoSidebarExpand className="text-xl" />
          ) : (
            <GoSidebarCollapse className="text-xl" />
          )}
        </button>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto py-2">
        {rooms.map((room) => (
          <button
            key={room._id}
            onClick={() => onRoomClick(room)}
            className={`flex items-center p-3 mx-2 rounded-lg w-full text-left ${
              activeRoomId === room._id ? "bg-blue-600" : "hover:bg-neutral-700"
            }`}
          >
            <img
              src={room.roomPic || logo}
              alt={room.name}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">{room.name}</p>
                <p className="text-xs text-neutral-400 truncate">
                  {room.members?.length || 0} members
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="p-3 border-t border-neutral-700 space-y-2">
        {!isCollapsed && (
          <>
            <Link
              to="/dashboard/invites"
              className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-700"
            >
              <FcInvite className="text-xl mr-3" />
              <span className="font-bold">Invites</span>
            </Link>
            <CreateRoom isSidebarOpen={!isMobile} />
          </>
        )}
        {isCollapsed && <CreateRoom isSidebarOpen={isMobile} />}
        <Logout isSidebarOpen={!isCollapsed} />
      </div>
    </>
  );
};

// Room Header Component
const RoomHeader = ({ room, onInviteClick, onSettingsClick, user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 border-b border-neutral-700">
      <div className="flex items-center space-x-4">
        <Link to={`/room/${room.roomCode}`}>
          <img
            src={room?.roomPic || logo}
            alt="Room"
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <div>
          <h2 className="font-bold">{room?.name}</h2>
          <p className="text-sm text-neutral-400">Code: {room?.roomCode}</p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => navigate(`/dashboard/${room._id}/requests`)}
          className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 rounded-lg text-sm"
        >
          Requests
        </button>

        <button
          onClick={onInviteClick}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
        >
          <FcInvite />
          <span>Invite</span>
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg hover:bg-neutral-700"
        >
          <FcSettings />
        </button>
        <LeaveRoom roomId={room?._id} />
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ onCreateRoom }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">No Room Selected</h2>
        <p className="text-neutral-400 mb-6">
          Select a room from the sidebar or create a new one to start
          collaborating
        </p>
        <button
          onClick={onCreateRoom}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
