import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Quiz from "./views/Quiz/Quiz.tsx";
import LogIn from "./views/Login";
import AppLayout from "./views/AppLayout";
import { LOGIN_REDIRECT_URL } from './config.ts';

import Presentation from "./views/Presentation";
import TitlePresentation from "./components/TitlePresentation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/quiz",
        element: (
            <AppLayout>
                <Quiz />
            </AppLayout>
        ),
    },
    {
        path: "/dev",
        element: (
            <AppLayout>
                <Presentation>
                    <TitlePresentation title={"HELLO!"} />
                </Presentation>
            </AppLayout>
        ),
    }
]);

function App() {
  return (
      <Auth0Provider
          domain="dev-5p1bwbmzifh7nytt.us.auth0.com"
          clientId="bkjLoDys3lxJh0ijyUKeVDMQW0HEfYHl"
          authorizationParams={{
              redirect_uri: LOGIN_REDIRECT_URL,
          }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
  )
}

export default App
