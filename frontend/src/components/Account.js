import { Box } from "@mui/material";

export default function Account() {

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
            <h1>Account</h1>
        </Box>
        </center>
    </>);
}