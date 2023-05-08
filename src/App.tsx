import Container from '@mui/material/Container';
import Header from './components/Header.jsx.tsx'

function App() {
  return (
    <>
        <Container disableGutters>
            <Header />
        </Container>
        <Container maxWidth='md'>
            <h1>Welcome to Pomme</h1>
            <h2>WIP</h2>
        </Container>
    </>
  )
}

export default App
