import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettlement } from "../store/features/settlementSlice";

const SuccessScreen = () => {
  const dispatch = useDispatch();

  const { currentAmount, success, fetchLoading, history } = useSelector(
    (state) => state.settlement
  );

  useEffect(() => {
    dispatch(fetchSettlement());
  }, [dispatch]);

  return (
    <>
      {fetchLoading ? (
        <div>Loading ...</div>
      ) : (
        <div
          className={`fixed inset-0 ${
            success ? "bg-green-500" : "bg-red-500"
          }  flex items-center justify-center`}
        >
          <h1 className="text-white text-3xl font-bold">
            {success
              ? `Sattlement Agreed on amount $${
                  history.find((h) => h.status === "Agreed").amount
                } !`
              : `Sattlement is still pending on amount $${currentAmount}`}
          </h1>
        </div>
      )}
    </>
  );
};

export default SuccessScreen;
