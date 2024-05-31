import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import SettlementProposalPage from "./pages/SettlementProposalPage";
import SettlementReviewPage from "./pages/SettlementReviewPage";
import { reduxStore } from "./store/reduxStore";
import SuccessScreen from "./pages/SuccessScreenPage";
import BasicNavbar from "./components/BasicNavbar";

function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <div className="app">
          <BasicNavbar />
          <Routes>
            <Route path="/settlement" element={<SuccessScreen />} />
            <Route path="/party-a" element={<SettlementProposalPage />} />
            <Route path="/party-b" element={<SettlementReviewPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
