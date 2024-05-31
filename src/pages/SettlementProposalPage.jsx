/**
 * This is Party A's screen
 * Sends offers to party B
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettlement,
  submitAmount,
} from "../store/features/settlementSlice";
import { useNavigate } from "react-router-dom";
import HistoryList from "../components/HistoryList";

const SettlementProposalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAmount, history, success, isAmountEdited } = useSelector(
    (state) => state.settlement
  );
  const [amountInput, setAmountInput] = useState(currentAmount);

  useEffect(() => {
    if (success) {
      navigate("/settlement");
    }
  }, [success, navigate]);

  useEffect(() => {
    dispatch(fetchSettlement());

    const interval = setInterval(() => {
      dispatch(fetchSettlement());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [dispatch]);

  useEffect(() => {
    setAmountInput(currentAmount);
  }, [currentAmount]);

  const handleChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isAmountInHistoryAlready = history.some(
      (h) => h.amount === amountInput
    );
    if (isAmountInHistoryAlready) {
      alert(
        `Amount ${amountInput} was alreeady submitted please select a different amount!`
      );
      return setAmountInput(currentAmount);
    }

    dispatch(submitAmount(amountInput));
    setAmountInput(0);
  };

  const isPositiveAmount = currentAmount > 0;
  const editedSuffix = isAmountEdited ? " - Edited" : "";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Submit or Edit Settlement Amount
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amountInput}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter or Edit Amount"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit / Edit
        </button>

        {isPositiveAmount && (
          <HistoryList
            history={[
              {
                amount: currentAmount,
                status: `Pending${editedSuffix}`,
              },
            ]}
            heading="Pending Perposals"
            type="Pending"
          />
        )}

        <HistoryList history={[...history].reverse()} />
      </form>
    </div>
  );
};

export default SettlementProposalPage;
