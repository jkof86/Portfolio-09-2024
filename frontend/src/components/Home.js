import { Box, Container, TextField, Toolbar, Typography } from "@mui/material";

import banner from '../images/photos/banner03.png';

export default function Home() {

    return (<>
        <Box sx={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center',
            backgroundSize: 'cover',
            border: '1px solid black',
            borderRadius:'5px',
            boxShadow: '0px 0px 1px 1px white',
            // marginBottom: '10px',
            // width: '100vw',
            height: '200px'
        }}>
            {/* <Typography sx={{
                fontSize: '20px',
                fontStyle: 'bold'
            }}>
                Home
            </Typography> */}
</Box>
    </>);
}