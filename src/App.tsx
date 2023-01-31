import React from "react";
import { Route, Routes } from "react-router-dom";
import PlaygroudPage from "./pages/PlaygroudPage";

function App() {
  return (
    <Routes>
      <Route path={"/playground"} element={<PlaygroudPage />} />
      <Route path={"/"} element={<PlaygroudPage />} />
    </Routes>
  );
}

export default App;
