import { createSlice } from "@reduxjs/toolkit";
import { dir, User } from "../utils/interfaces";

interface usersState {
  usersList: {
    data: User[];
    loading: boolean;
    error: any;
    direction: dir;
  };
}

const initialState: usersState = {
  usersList: {
    data: [],
    loading: false,
    error: null,
    direction: dir.NONE,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.usersList.data = action.payload;
    },
    setAllUsersLoading: (state, action) => {
      state.usersList.loading = action.payload;
    },
    setAllUsersError: (state, action) => {
      state.usersList.error = action.payload;
    },
    addUser: (state, action) => {
      const index = Date.now();
      state.usersList.data.push({
        ...action.payload,
        id: index,
      });
    },
    deleteUser: (state, action) => {
      state.usersList.data = state.usersList.data.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUser: (state, action) => {
      const index = state.usersList.data.findIndex(
        (user) => user.id === action.payload.id
      );
      console.log("index", index);
      if (index >= 0) state.usersList.data[index] = action.payload;
    },
    setUserDataDirection: (state, action) => {
      state.usersList.direction = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setAllUsersError,
  setAllUsersLoading,
  addUser,
  deleteUser,
  updateUser,
  setUserDataDirection,
} = usersSlice.actions;

export default usersSlice.reducer;
