import { Toolbar, Button, Box } from "@mui/material";
import { Link } from "../../../node_modules/react-router-dom/dist/index";


import { googleLogout } from '@react-oauth/google';

export default function Navbar() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    function handleLogout() {
        googleLogout(); // disables auto-login
        alert(`${storedUser.username} logged out successfully`);
        localStorage.removeItem('isLoggedIn');
        window.location.reload();

    }

    return (<>
        {
            <Toolbar sx={{
                //this rgb value is semi transparent
                background: 'rgba(0,0,0,0)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: 'auto',
                marginTop: 4
            }}
                variant="menu"
                position="static"
            >
                <Box textAlign={"center"} width={'100vw'}>
                    <Button variant='contained' sx={{
                        backgroundColor: 'grey',
                        borderRadius: '0px',
                        margin: '0px',
                        marginTop: '10px'
                    }}
                        component={Link} to='/home'>
                        Home
                    </Button>

                    <Button variant='contained' sx={{
                        backgroundColor: 'grey',
                        borderRadius: '0px',
                        margin: '0px',
                        marginTop: '10px'
                    }}
                        component={Link} to='/register'>
                        Register
                    </Button>

                    <Button variant='contained' sx={{
                        backgroundColor: 'grey',
                        borderRadius: '0px',
                        margin: '0px',
                        marginTop: '10px'
                    }}
                        component={Link} to='/login'>
                        Login
                    </Button>

                    <Button variant='contained'
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: 'grey',
                            borderRadius: '0px',
                            margin: '0px',
                            marginTop: '10px'
                        }}
                        component={Link} to='/login'>
                        Logout
                    </Button>

                </Box>
            </Toolbar >
        }
    </>)
}