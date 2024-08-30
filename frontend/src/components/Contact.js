import {
    Box, Container, Toolbar, Typography,
    Button, Grid, Card, CardActions, CardActionArea,
    CardContent, CardMedia
} from "@mui/material";

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
            <Typography sx={{
                fontSize: '20px',
                fontStyle: 'bold'
            }}>
                Contact Information
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

                    <Grid item xs={6}>

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                maxWidth: '50%',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="LinkedIn Icon"
                                        image={require("../images/icons/linkedIn_PNG8.png")}
                                    >
                                    </CardMedia>
                                    <CardContent >

                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={6}>

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                maxWidth: '50%',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Facebook Icon"
                                        image={require("../images/icons/Facebook_Icon_(Official_2).png")}
                                    >
                                    </CardMedia>
                                    <CardContent >

                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={6}>

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                maxWidth: '50%',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Instagram Icon"
                                        image={require("../images/icons/Instagram_icon.png")}
                                    >
                                    </CardMedia>
                                    <CardContent >

                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={6}>

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                maxWidth: '50%',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Youtube Icon"
                                        image={require("../images/icons/youtube-transparent-png-15.png")}
                                    >
                                    </CardMedia>
                                    <CardContent >

                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                </Grid>
            </Box>
        </Container >
    </>);
}