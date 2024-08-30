import { Toolbar, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import NavDrawer from "./NavDrawer";

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
                margin: '2px'
            }}
                variant="menu"
                position="static"
            >
                
                <Button variant='contained' sx={{
                    backgroundColor: 'grey',
                    borderRadius: '0px',
                    margin: '0px',
                    marginTop: '10px'
                }}
                    component={Link} to='/'>
                    Home
                </Button>
                <Button variant='contained' sx={{
                    backgroundColor: 'grey',
                    borderRadius: '0px',
                    margin: '0px',
                    marginTop: '10px'
                }}
                    component={Link} to='/register'
                >
                    Register
                </Button>

                <Button variant='contained' sx={{
                    backgroundColor: 'grey',
                    borderRadius: '0px',
                    margin: '0px',
                    marginTop: '10px'
                }}
                    component={Link} to='/signin'>
                    Login
                </Button>

            </Toolbar>
        }
    </>)
}
