import { Box, Container, Toolbar } from "@mui/material";

import banner from '../images/photos/banner03.png';

export default function Home() {

    return (<>
        <center>
            <Toolbar sx={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                height: '200px',
                maxHeight: '200px',
                width: '700px'
            }}
            />

            <Box padding={0} sx={{
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '20px',
                margin: '20px',
                width: '50vw',
                height: '85vh'
            }}>
                <h1>Home</h1>
            </Box>
        </center>
    </>);
}