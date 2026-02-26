import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  userId:"",
  createdAt:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, phone , userId , createdAt } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
      state.userId = userId;
      state.createdAt = createdAt; // optional: track when user data was set
    },
    clearUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phone = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;