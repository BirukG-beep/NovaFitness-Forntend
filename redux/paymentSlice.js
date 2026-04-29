import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  overdueUsers: [],
  paidUsers: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setUsersByOverdue: (state, action) => {
      const users = action.payload;

      state.overdueUsers = users.filter(
        (u) => (u.overdueDays || 0) > 0
      );

      state.paidUsers = users.filter(
        (u) => (u.overdueDays || 0) === 0
      );
    },
  },
});

export const { setUsersByOverdue } = paymentSlice.actions;
export default paymentSlice.reducer;