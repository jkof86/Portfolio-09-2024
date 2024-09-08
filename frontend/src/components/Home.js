import { Box } from "@mui/material";

import banner from '../images/photos/banner03.png';

export default function Home() {

    return (<>
        <Box sx={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            borderRadius: '25px',
            border: '1px solid black',
            boxShadow: '0px 0px 2px 2px white',
            minHeight: '200px'
        }}
        />

        <center>
            <Box padding={0} sx={{
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '20px',
                margin: '20px',
                width: '75vw',
                height: '85vh'
            }}>
                <h1>Home</h1>
            </Box>
        </center>
    </>);
}