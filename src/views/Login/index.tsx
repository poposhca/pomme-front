import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import logoUrl from '../../assets/logo.png'

const LogIn= () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item md={6} height="100vh">
                    <Box sx={{ backgroundColor: 'orange', height: '100%'}}>
                        <Box sx={{position: 'relative', left: '7vh', top: '10vh'}}>
                            <img width={'80%'} src={logoUrl} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={6} height="100vh">
                    <Box sx={{ textAlign:'center', position:'relative', top:'30vh' }}>
                        <h1>Welcome To POMME Project</h1>
                        <Button variant="outlined" onClick={() => loginWithRedirect()}>Log In</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LogIn;
