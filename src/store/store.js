import { configureStore } from "@reduxjs/toolkit";
import investmentListSlice from "./investmentListSlice";

const store = configureStore({
  reducer: {
    investment: investmentListSlice,
  },
});

export default store;
