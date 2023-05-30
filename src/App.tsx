import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Container from '@mui/material/Container';
import { Auth0Provider } from "@auth0/auth0-react";
import Header from './components/Header.tsx'
import Quiz from "./components/Quiz.tsx";
import LogIn from "./components/LogIn.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/quiz",
        element:
            <>
                <Container disableGutters>
                    <Header />
                </Container>
                <Container maxWidth='md'>
                    <Quiz />
                </Container>
            </>,
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
