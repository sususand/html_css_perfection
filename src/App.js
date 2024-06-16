import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./views/NotFound";
import MainLayout from "./components/layouts/main/MainLayout";
import InvestmentTypeLists from "./views/investmentTypeLists/InvestmentTypeLists.js";
import MemberLists from "./views/memberLists/MemberLists.js";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<InvestmentTypeLists />} />
        <Route path="investment-types" element={<InvestmentTypeLists />} />
        <Route path="view-short" element={<MemberLists />} />

        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default App;
