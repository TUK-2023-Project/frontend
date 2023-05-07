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
import NotFound from "./pages/NotFound";
import PublicPage from "pages/Auth/components/DivisionAuth/PublicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/main", element: <MainPage /> },
      {
        path: "/signup",
        element: (
          <PublicPage
            Component={SignUpPage}
            text="이미 로그인된 상태입니다."
            link="/main"
            restricted
          />
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicPage
            Component={SignInPage}
            text="이미 로그인된 상태입니다."
            link="/main"
            restricted
          />
        ),
      },
      {
        path: "/incorrectnote",
        element: (
          <PrivatePage
            Component={IncorrectNotePage}
            text="로그인을 해주세요!"
            link="/signin"
            restricted
          />
        ),
      },
      {
        path: "/game",
        element: (
          <PrivatePage
            Component={Game}
            text="로그인을 해주세요!"
            link="/signin"
            restricted
          />
        ),
      },
      { path: "/rank", element: <Ranking /> },
      { path: "/playground", element: <PlaygroudPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
