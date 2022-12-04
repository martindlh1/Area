import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./areaSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    area: areaReducer,
  },
});
