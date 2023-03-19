import MainPage from "./pages/MainPage";
import SignInPage from "./pages/Auth/SignInPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PlaygroudPage from "./pages/Playground";
import SignUpPage from "./pages/Auth/SignUpPage";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/main"} element={<MainPage />} />
      <Route path={"/signup"} element={<SignUpPage />} />
      <Route path={"/signin"} element={<SignInPage />} />
      <Route path={"/incorrectnote"} element={<IncorrectNotePage />} />
      <Route path={"/playground"} element={<PlaygroudPage />} />
      <Route path={"/game"} element={<Game />} />
      <Route path={"/rank"} element={<Ranking />} />
    </Routes>
  );
}

export default App;
