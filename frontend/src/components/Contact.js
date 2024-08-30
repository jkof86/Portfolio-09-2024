import { Box, Container, Grid, Divider, Toolbar, Typography } from "@mui/material";

export default function Contact() {

    return (<>
        <Toolbar sx={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: 'grey',
            border: '1px solid black',
            boxShadow: '0px 0px 2px 2px white',
            marginBottom: '10px',
            padding: '10px',
            width: '100%'
        }}>
            <Typography sx={{ fontSize:'20px',
            fontStyle:'bold'}}>
                Contact Us
            </Typography>
        </Toolbar>

        {/********************************************************/}

        <Container sx={{ width: '95%' }}>

            <Box sx={{
                flexGrow: 1,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '10px',
                margin: '10px',
                width: '100%'
            }}>
                <center>
                    {/* <img src={require("../images/macros.jpg")} width={'50%'} height={'50%'} /> */}
                </center>

                <Grid container spacing={2}>
                    <Grid item xs={3}>


                    </Grid>
                       
                        <Divider sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            borderBottomWidth: '2px',
                            borderColor: 'black'
                        }} />

                        
                    </Grid>
            
            </Box>
        </Container >
    </>);
}