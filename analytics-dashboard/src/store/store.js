import { configureStore } from "@reduxjs/toolkit";
import evReducer from "./reducers/reducers";
export default configureStore({
  reducer: {
    evReducer: evReducer,
  },
});
