import Container from '@mui/material/Container';
import Header from './components/Header.tsx'
// import SingleAnswer from './components/SingleAnswer.tsx';
import MultipleAnswer from "./components/MultipleAnswer.tsx";

function App() {
  return (
    <>
        <Container disableGutters>
            <Header />
        </Container>
        <Container maxWidth='md'>
            <MultipleAnswer />
        </Container>
    </>
  )
}

export default App
