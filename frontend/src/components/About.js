import { Box } from "@mui/material";

export default function About() {

    return (<>
    <center>
        <Box component="section" sx={{
            textAlign: 'center', 
            justifyContent: 'center',
            backgroundColor: 'grey',
            borderRadius: '25px',
            border: '1px solid black',
            boxShadow: '0px 0px 2px 2px white',
            margin: '10px',
            padding: '10px',
            width: '50%' }}>
            <h1>About</h1>
        </Box>
        </center>
    </>);
}