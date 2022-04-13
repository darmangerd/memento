import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import ListCreate from "./pages/list/list-create";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/list/create" element={<ListCreate />} />
      </Routes>
    </div>
  );
}

export default App;
