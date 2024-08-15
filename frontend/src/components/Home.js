import { Box } from "@mui/material";

export default function Home() {

    return (<>
        <Box component="section" sx={{
            textAlign: 'center', 
            backgroundColor: 'grey',
            borderRadius: '25px',
            border: '3px solid white',
            margin: '10px',
            padding: '10px' }}>
            <h1>Nutrition App</h1>
        </Box>
    </>);
}