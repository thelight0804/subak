import { configureStore } from "@reduxjs/toolkit";
import userData from "./userSlice";

export default configureStore({
  reducer: {
    userData: userData.reducer,
  },
});