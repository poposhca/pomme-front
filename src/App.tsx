import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Quiz from "./components/Quiz.tsx";
import LogIn from "./views/Login";
import AppLayout from "./views/AppLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/quiz",
        element: <AppLayout Component={Quiz} />,
    }
]);

function App() {
  return (
      <Auth0Provider
          domain="dev-5p1bwbmzifh7nytt.us.auth0.com"
          clientId="bkjLoDys3lxJh0ijyUKeVDMQW0HEfYHl"
          authorizationParams={{
              redirect_uri: "http://localhost:5173/quiz",
          }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
  )
}

export default App
