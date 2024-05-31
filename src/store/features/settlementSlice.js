import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch settlement data
export const fetchSettlement = createAsyncThunk(
  "settlement/fetchSettlement",
  async () => {
    const response = await fetch("http://localhost:3001/settlement");
    return response.json();
  }
);

// Async thunk to submit a new amount
export const submitAmount = createAsyncThunk(
  "settlement/submitAmount",
  async (amount, { getState, dispatch }) => {
    const { settlement } = getState();

    await fetch("http://localhost:3001/settlement", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history: settlement.history,
        isAmountEdited:
          settlement.currentAmount * 1 !== 0 &&
          amount * 1 !== settlement.currentAmount * 1,
        currentAmount: amount,
        success: false,
      }),
    });
    dispatch(fetchSettlement());
  }
);

// Async thunk to respond to an amount
export const respondToAmount = createAsyncThunk(
  "settlement/respondToAmount",
  async (payload, { getState, dispatch }) => {
    const { settlement } = getState();
    const updatedHistory = [...settlement.history];

    await fetch("http://localhost:3001/settlement", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...settlement,
        isAmountEdited: false,
        currentAmount: 0,
        history: [
          ...updatedHistory,
          { amount: payload.amount, status: payload.status },
        ],
        success: payload.status === "Agreed",
      }),
    });
    dispatch(fetchSettlement()); // Fetch updated data after response
  }
);

// Create the slice
export const settlementSlice = createSlice({
  name: "settlement",
  initialState: {
    currentAmount: 0,
    isAmountEdited: false,
    history: [],
    success: false,
    fetchLoading: false,
  },
  reducers: {
    // Reducers for synchronous actions [For futrue :)]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettlement.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchSettlement.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          fetchLoading: false,
          error: null,
        };
      })
      .addCase(fetchSettlement.rejected, (state, action) => {
        state.fetchLoading = false;
      });
  },
});

export default settlementSlice.reducer;
