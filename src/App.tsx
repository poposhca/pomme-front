import Container from '@mui/material/Container';
import Header from './components/Header.tsx'
import SingleAnswer from './components/SingleAnswer.tsx';

function App() {
  return (
    <>
        <Container disableGutters>
            <Header />
        </Container>
        <Container maxWidth='md'>
            <SingleAnswer />
        </Container>
    </>
  )
}

export default App
