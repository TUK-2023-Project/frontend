import MainPage from "./pages/MainPage";
import SignInPage from "./pages/Auth/SignInPage/index";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlaygroudPage from "./pages/Playground";
import SignUpPage from "./pages/Auth/SignUpPage/index";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";
import IncorrectNotePage from "pages/IncorrectNote/IncorrectNoteList";
import PrivatePage from "pages/Auth/components/DivisionAuth/PrivatePage";
import Root from "pages/Root";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/main", element: <MainPage /> },
      {
        path: "/signup",
        element: (
          <PrivatePage
            Component1={MainPage}
            Component2={SignUpPage}
            text="이미 로그인된 상태입니다."
            link="/main"
            restricted
          />
        ),
      },
      {
        path: "/signin",
        element: (
          <PrivatePage
            Component1={MainPage}
            Component2={SignInPage}
            text="이미 로그인된 상태입니다."
            link="/main"
            restricted
          />
        ),
      },
      { path: "/incorrectnote", element: <IncorrectNotePage /> },
      { path: "/game", element: <Game /> },
      { path: "/rank", element: <Ranking /> },
      { path: "/playground", element: <PlaygroudPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
