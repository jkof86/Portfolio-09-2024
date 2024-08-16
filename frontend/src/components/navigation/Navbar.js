import { Toolbar, Button } from "@mui/material";
import { Link } from "../../../node_modules/react-router-dom/dist/index";

// export default function Navbar({ loggedIn, setLoggedIn }) {

export default function Navbar() {

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem('loggedInUser');
    //     if (loggedInUser) {
    //         setLoggedIn(true);
    //     }
    // }, []);

    return (<>

        {
            <Toolbar sx={{
                //this rgb value is semi transparent
                flexGrow: 1, background: 'rgba(0,0,0,0.5)',
                color: 'white', fontSize: '32px',
                justifyContent: 'center',
                border: '1px solid white',
                margin: '2px'
            }}
                variant="menu"
                position="static"
            >
                <Button variant='contained' sx={{ margin: '10px' }}
                    component={Link} to='/'>
                    Home
                </Button>
                <Button variant='contained' sx={{ margin: '10px' }}
                    component={Link} to='/register'
                >
                    Register
                </Button>

                <Button variant='contained' sx={{ margin: '10px' }}
                    component={Link} to='/signin'>
                    Login
                </Button>

            </Toolbar>
        }
    </>)
}
