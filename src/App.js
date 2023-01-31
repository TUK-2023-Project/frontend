import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PlaygroudPage from "./pages/PlaygroudPage";

function App() {
  return (
    <Routes>
      <Route path="/playground" element={<PlaygroudPage />} />
    </Routes>
  );
}

export default App;
