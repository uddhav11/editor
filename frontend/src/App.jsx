// // import { useEffect } from "react";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// //   useNavigate,
// //   useLocation,
// // } from "react-router-dom";

// // import "./App.css";
// // import Register from "./auth/Register";
// // import RegisterVerify from "./auth/RegisterVerify";
// // import Login from "./auth/Login";
// // import LoginVerify from "./auth/LoginVerify";
// // import LandingPage from "./pages/LandingPage";
// // import Dashboard from "./pages/Dashboard";
// // import Profile from "./pages/Profile";
// // import InvitePage from "./pages/InvitePage";
// // import Requests from "./pages/Requests";

// // const getUser = () => {
// //   try {
// //     return JSON.parse(localStorage.getItem("user"));
// //   } catch (error) {
// //     return null;
// //   }
// // };

// // const PrivateRoute = ({ children }) => {
// //   const user = getUser();
// //   return user ? children : <Navigate to="/login" />;
// // };

// // function AppRoutes() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const user = getUser();

// //   useEffect(() => {
// //     if (user && location.pathname === "/") {
// //       navigate("/dashboard");
// //     } else if (!user && location.pathname === "/dashboard") {
// //       navigate("/");
// //     }
// //   }, [location.pathname, navigate, user]);

// //   return (
// //     <Routes>
// //       <Route path="/" element={<LandingPage />} />
// //       <Route
// //         path="/dashboard"
// //         element={
// //           <PrivateRoute>
// //             <Dashboard />
// //           </PrivateRoute>
// //         }
// //       />
// //       <Route path="/register" element={<Register />} />
// //       <Route path="/register/verify" element={<RegisterVerify />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/login/verify" element={<LoginVerify />} />
// //       <Route path='/profile' element={<Profile />} />
// //       <Route path='/dashboard/invites' element={<InvitePage />}  />
// //       <Route path='/dashboard/request' element={<Requests />} />
// //       <Route path="*" element={<Navigate to="/" />} />
// //     </Routes>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <Router>
// //       <AppRoutes />
// //     </Router>
// //   );
// // }

// import { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation,
//   Outlet
// } from "react-router-dom";
// import "./App.css";
// import Register from "./auth/Register";
// import RegisterVerify from "./auth/RegisterVerify";
// import Login from "./auth/Login";
// import LoginVerify from "./auth/LoginVerify";
// import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import InvitePage from "./pages/InvitePage";
// import Requests from "./pages/Requests";
// import InvitesPage from "./pages/InvitesPage";
// import RoomRequestsPage from "./pages/RoomRequestsPage";
// import RoomEditor from "./components/CodeEditor"; // Assuming CodeEditor is your room view
// import { getProfile } from "./redux/authSlice";
// import { useDispatch } from "react-redux";

// const getUser = () => {
//   const dispatch= useDispatch()
//   try {
//     return (dispatch(getProfile()))
//   } catch (error) {
//     return null;
//   }
// };

// const PrivateRoute = ({ children }) => {
//   const user = getUser();
//   return user ? children : <Navigate to="/login" />;
// };

// function AppRoutes() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = getUser();

//   useEffect(() => {
//     if (user && location.pathname === "/") {
//       navigate("/dashboard");
//     } else if (!user && location.pathname.startsWith("/dashboard")) {
//       navigate("/login");
//     }
//   }, [location.pathname, navigate, user]);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/register/verify" element={<RegisterVerify />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/login/verify" element={<LoginVerify />} />

//       {/* Protected Dashboard Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<DashboardHome />} />
//         <Route path="invites" element={<InvitesPage />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path=":roomId" element={<RoomEditor />} /> {/* Room view */}
//         <Route path=":roomId/requests" element={<RoomRequestsPage />} />
//       </Route>

//       {/* Legacy Routes (for backward compatibility) */}
//       <Route path="/profile" element={
//         <PrivateRoute>
//           <Profile />
//         </PrivateRoute>
//       } />
//       <Route path="/dashboard/invites" element={
//         <PrivateRoute>
//           <InvitePage />
//         </PrivateRoute>
//       } />
//       <Route path="/dashboard/request" element={
//         <PrivateRoute>
//           <Requests />
//         </PrivateRoute>
//       } />

//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// function DashboardHome() {
//   return (
//     <div className="flex items-center justify-center h-full">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Welcome to NexusCode</h2>
//         <p className="text-neutral-400">
//           Select a room from the sidebar or create a new one
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// import { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";

// // Import components
// import Register from "./auth/Register";
// import RegisterVerify from "./auth/RegisterVerify";
// import Login from "./auth/Login";
// import LoginVerify from "./auth/LoginVerify";
// import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import InvitePage from "./pages/InvitePage";
// import Requests from "./pages/Requests";
// import RoomPage from "./pages/RoomPage";
// import { getProfile, logoutUser } from "./redux/authSlice";

// const PrivateRoute = ({ children }) => {
//   const user = useSelector((state) => state.auth.user);
//   const location = useLocation();

//   return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
// };

// function AppRoutes() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     dispatch(getProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user) {
//       const tokenExpiration = user?.expiresIn;
//       if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
//         dispatch(logoutUser());
//         navigate("/login", { state: { from: location } });
//       }
//     }

//     // Modified redirect logic
//     if (user && (location.pathname === "/" || location.pathname === "/login")) {
//       navigate("/dashboard");
//     } else if (!user && !["/", "/login", "/register"].includes(location.pathname)) {
//       navigate("/login", { state: { from: location } });
//     }
//   }, [user, location, navigate, dispatch]);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/register/verify" element={<RegisterVerify />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/login/verify" element={<LoginVerify />} />

//       {/* Protected Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<DashboardHome />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="requests" element={<Requests />} />
//       </Route>

//       {/* Standalone Room Route */}
//       <Route
//         path="/room/:roomCode"
//         element={
//           <PrivateRoute>
//             <RoomPage />
//           </PrivateRoute>
//         }
//       />

//       <Route path="/dashboard/invites" element={<PrivateRoute>
//             <InvitePage />
//           </PrivateRoute>} />

//       {/* Fallback Route */}
//       <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
//     </Routes>
//   );
// }

// function DashboardHome() {
//   return <div>Dashboard Home</div>;
// }

// export default function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }












import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

// Import components
import Register from "./auth/Register";
import RegisterVerify from "./auth/RegisterVerify";
import Login from "./auth/Login";
import LoginVerify from "./auth/LoginVerify";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import InvitePage from "./pages/InvitePage";
import Requests from "./pages/Requests";
import RoomPage from "./pages/RoomPage";
import { getProfile, logoutUser } from "./redux/authSlice";
import CodeEditor from "./components/CodeEditor";
import RoomRequestsPage from "./pages/RoomRequestsPage";

// Protect routes
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function AppRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const tokenExpiration = user?.expiresIn;
      if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
        dispatch(logoutUser());
        navigate("/login", { state: { from: location } });
      }
    }

    // Redirect if logged in
    if (user && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/dashboard");
    }

    // Redirect if not logged in and trying to access protected page
    if (
      !user &&
      ![
        "/",
        "/login",
        "/register",
        "/login/verify",
        "/register/verify",
      ].includes(location.pathname)
    ) {
      navigate("/login", { state: { from: location } });
    }
  }, [user, location, navigate, dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/verify" element={<RegisterVerify />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/verify" element={<LoginVerify />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/requests"
        element={
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/invites"
        element={
          <PrivateRoute>
            <InvitePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/room/:roomCode"
        element={
          <PrivateRoute>
            <RoomPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/:roomId"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
            <Route path="/dashboard/:roomId/requests" element={<PrivateRoute>
            <RoomRequestsPage />
          </PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
