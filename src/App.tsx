import Container from '@mui/material/Container';
import Header from './components/Header.tsx'
import Quiz from "./components/Quiz.tsx";

function App() {
  return (
    <>
        <Container disableGutters>
            <Header />
        </Container>
        <Container maxWidth='md'>
            <Quiz />
        </Container>
    </>
  )
}

export default App
