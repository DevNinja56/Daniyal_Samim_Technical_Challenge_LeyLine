import { configureStore } from "@reduxjs/toolkit";
import settlementSlice from "./features/settlementSlice";

export const reduxStore = configureStore({
  reducer: {
    settlement: settlementSlice,
  },
});
