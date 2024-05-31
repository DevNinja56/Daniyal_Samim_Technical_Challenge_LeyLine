/**
 * This is Party B's screen
 * Accept or dispute offers
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettlement,
  respondToAmount,
} from "../store/features/settlementSlice";
import { useNavigate } from "react-router-dom";
import HistoryList from "../components/HistoryList";

const SettlementReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAmount, history, success } = useSelector(
    (state) => state.settlement
  );

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

  const handleAgree = () => {
    dispatch(respondToAmount({ amount: currentAmount, status: "Agreed" }));
  };

  const handleDispute = () => {
    const isAmountInHistoryAlready = history.some(
      (h) => h.amount === currentAmount
    );
    if (isAmountInHistoryAlready) {
      return alert(
        `Amount ${currentAmount} was alreeady Disputed please wait while new perposal is submitted`
      );
    }
    dispatch(respondToAmount({ amount: currentAmount, status: "Disputed" }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Review Settlement Proposals
      </h1>
      <p className="text-lg text-gray-800 mb-6">
        Current Proposed Amount:{" "}
        <span className="font-bold text-green-600">${currentAmount}</span>
      </p>
      <div className="flex justify-around mb-6">
        <button
          onClick={handleAgree}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Agree
        </button>
        <button
          onClick={handleDispute}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Dispute
        </button>
      </div>
      <div>
        <HistoryList history={[...history].reverse()} />
      </div>
    </div>
  );
};

export default SettlementReviewPage;
