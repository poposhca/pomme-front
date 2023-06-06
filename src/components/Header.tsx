import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import { useUserProfile } from "../utils/useUserProfile.ts";

const Header = () => {
    const user = useUserProfile();
    const { logout } = useAuth0();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <h2>POMME</h2>
                    <Box>
                        <p>{user?.name}</p>
                        <Button
                            color="inherit"
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        >
                            Log Out
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
