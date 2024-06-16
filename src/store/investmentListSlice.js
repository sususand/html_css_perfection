import { createSlice } from "@reduxjs/toolkit";
import { dataArray } from "../common/dataArray";

const investmentListSlice = createSlice({
  name: "investment",
  initialState: {
    data: dataArray,
  },
  reducers: {
    addInvestmentList: (state, action) => {
      state.data.push(action.payload);
    },
    updateInvestmentList: (state, action) => {
      //state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addInvestmentList, updateInvestmentList } =
  investmentListSlice.actions;
export default investmentListSlice.reducer;
