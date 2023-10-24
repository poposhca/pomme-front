import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Quiz from "./views/Quiz/Quiz.tsx";
import LogIn from "./views/Login";
import AppLayout from "./views/AppLayout";
import ApiClient from "./components/ApiClient";
import { LOGIN_REDIRECT_URL } from './config.ts';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/quiz",
        element: (
            <AppLayout>
                <ApiClient>
                    <Quiz />
                </ApiClient>
            </AppLayout>
        ),
    },
    {
        path: "/dev",
        element: (
            <AppLayout>
                <h1>
                    This Page is for develpment only
                </h1>
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
