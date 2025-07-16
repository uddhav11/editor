// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000/api/rooms"; // the base URL as needed

// export const createRoom = createAsyncThunk(
//   "room/createRoom",
//   async ({ name, isPrivate }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/create", { name, isPrivate });
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const joinRoomRequest = createAsyncThunk(
//   "room/joinRoomRequest",
//   async (roomCode, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/request", { roomCode });
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const leaveRoom = createAsyncThunk(
//   "/room/leaveRoom",
//   async (roomId, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${roomId}/leave`);
//       return { roomId };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const roomSlice= createSlice({
//     name: 'room',
//     initialState: {
//         rooms: [],
//         currentRoom: null,
//         joinRequest: [],
//         invites: [],
//         status: 'idle',
//         error: null,
//     },

//     reducers: {
//         setCurrentRoom: (state, action) => {
//             state.currentRoom= action.payload;
//         }
//     },

//     extraReducers: (builder) => {
//         builder.addCase(createRoom.pending, (state) => {
//             state.status= "loading"
//         })
//         .addCase(createRoom.fulfilled, (state, action) => {
//             state.rooms.push(action.payload);
//             state.status= "successed";
//         })
//         .addCase(createRoom.rejected, (state, action) => {
//             state.error= action.payload;
//             state.status= "failed"
//         })

//         .addCase(joinRoomRequest.pending, (state) => {
//             state.status= "loading";
//         })
//         .addCase(joinRoomRequest.fulfilled, (state, action) => {
//             state.status= 'successed';
//         })
//         .addCase(joinRoomRequest.rejected, (state, action) => {
//             state.error= action.payload;
//             state.status= "failed";
//         })

//         .addCase(leaveRoom.pending, (state) => {
//             state.status= "loading";
//         })
//         .addCase(leaveRoom.fulfilled, (state, action) => {
//             state.rooms= state.rooms.filter(r => r._id !== action.payload.roomId)
//             if(state.currentRoom?._id === action.payload.roomId){
//                 state.currentRoom= null;
//             }
//             state.status= "successed"
//         })
//         .addCase(leaveRoom.rejected, (state, action) => {
//             state.error= action.payload
//             state.status= "failed";
//         })
//     }
// })

// export const {setCurrentRoom}= roomSlice.actions;
// export default roomSlice.reducer;





import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://editor-1-kjah.onrender.com"; // the base URL as needed

// Async Thunks
export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ name, isPrivate, language }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/rooms/create",
        { name, isPrivate, language },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const joinRoomRequest = createAsyncThunk(
  "room/joinRoomRequest",
  async ({ roomCode }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/rooms/request", { roomCode });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleJoinRequest = createAsyncThunk(
  "room/handleJoinRequest",
  async ({ roomId, requestId, action }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/rooms/${roomId}/requests/${requestId}`,
        { action }
      );
      console.log("this is handleJoin request", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const inviteUser = createAsyncThunk(
  "room/inviteUser",
  async ({ roomId, userCode }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/rooms/${roomId}/invite`, { userCode });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getInvites = createAsyncThunk(
  "room/getInvites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/rooms/invites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleInvite = createAsyncThunk(
  "room/handleInvite",
  async ({ inviteId, action }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/rooms/invites/${inviteId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaveRoom = createAsyncThunk(
  "room/leaveRoom",
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/rooms/${roomId}/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return { roomId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRooms = createAsyncThunk(
  "room/getroom",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/rooms/getroom", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchRoomsByName = createAsyncThunk(
  "room/searchRoomsByName",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/rooms/search?name=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

export const getAllRooms = createAsyncThunk(
  "room/getAllRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/rooms/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }); // Make sure the backend returns full room data
      return res.data.rooms;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get rooms"
      );
    }
  }
);

export const getParticularRoom = createAsyncThunk(
  "room/particularroom",
  async ({ roomCode }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/rooms/room",
        { roomCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return res.data.room;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getJoinRequests = createAsyncThunk(
  "room/getJoinRequests",
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`api/rooms/${roomId}/requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data; // array of requests
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch join requests"
      );
    }
  }
);

// Slice
const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    createdRooms: [],
    joinedRooms: [],
    currentRoom: null,
    joinRequests: [],
    joinRequestStatus: null,
    joinRequestMessage: null,

    invites: [],
    status: "idle",
    searchResults: [],
    searchStatus: "idle",
    searchError: null,
    allRooms: [],
    loadingRooms: false,
    particularRoom: [],
    error: null,
  },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    clearRoomState: (state) => {
      state.rooms = [];
      state.currentRoom = null;
      state.joinRequests = [];
      state.invites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Join Room Request
      .addCase(joinRoomRequest.pending, (state) => {
        state.joinRequestStatus = "loading";
        state.joinRequestMessage = null;
      })
      .addCase(joinRoomRequest.fulfilled, (state, action) => {
        state.joinRequestStatus = "succeeded";
        state.joinRequestMessage =
          action.payload.message || "Join request sent successfully";
      })
      .addCase(joinRoomRequest.rejected, (state, action) => {
        state.joinRequestStatus = "failed";
        state.joinRequestMessage =
          action.payload?.message || "Failed to send join request";
      })

      // Handle Join Request
      .addCase(handleJoinRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleJoinRequest.fulfilled, (state, action) => {
        const { room } = action.payload;
        state.rooms = state.rooms.map((r) => (r._id === room._id ? room : r));
        state.status = "succeeded";
      })
      .addCase(handleJoinRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Invite User
      .addCase(inviteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(inviteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Get Invites
      .addCase(getInvites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getInvites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invites = action.payload;
      })
      .addCase(getInvites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Failed to fetch invites";
      })

      // Handle Invite
      .addCase(handleInvite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleInvite.fulfilled, (state, action) => {
        const { room } = action.payload;
        if (room) {
          state.rooms.push(room);
        }
        state.invites = state.invites.filter(
          (i) => i._id !== action.meta.arg.inviteId
        );
        state.status = "succeeded";
      })
      .addCase(handleInvite.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Leave Room
      .addCase(leaveRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(leaveRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(
          (r) => r._id !== action.payload.roomId
        );
        if (state.currentRoom?._id === action.payload.roomId) {
          state.currentRoom = null;
        }
        state.status = "succeeded";
      })
      .addCase(leaveRoom.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      .addCase(getRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createdRooms = action.payload.createdRooms;
        state.joinedRooms = action.payload.joinedRooms;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Failed to fetch rooms";
      })

      .addCase(searchRoomsByName.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(searchRoomsByName.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchRoomsByName.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.payload;
      })

      .addCase(getAllRooms.pending, (state) => {
        state.loadingRooms = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.allRooms = action.payload;
        state.loadingRooms = false;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingRooms = false;
      })

      .addCase(getParticularRoom.pending, (state) => {
        state.loadingRooms = true;
      })
      .addCase(getParticularRoom.fulfilled, (state, action) => {
        state.particularRoom = action.payload;
        state.loadingRooms = false;
      })
      .addCase(getParticularRoom.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingRooms = false;
      })

      .addCase(getJoinRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJoinRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.joinRequests = action.payload.joinRequests; // array of { roomId, roomName, user, requestId... }
      })
      .addCase(getJoinRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentRoom, clearRoomState } = roomSlice.actions;
export default roomSlice.reducer;
