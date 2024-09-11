import {
    Box, Toolbar, Typography,
    Grid, Card, CardActionArea,
    CardMedia
} from "@mui/material";
import { Link } from 'react-router-dom';
import SlideShow from "./SlideShow";

export default function Contact() {

    return (<>
        <Toolbar sx={{
            justifyContent: 'center',
            backgroundColor: 'grey',
            border: '1px solid black',
            boxShadow: '0px 0px 2px 2px white',
            marginBottom: '10px',
            width: '100vw'
        }}>
            <Typography sx={{
                fontSize: '20px',
                fontStyle: 'bold'
            }}>
                Contact Information
            </Typography>
        </Toolbar>

        {/********************************************************/}

        {/* <Container disableGutters={false} sx={{ width: '100vw' }}> */}
        <center>
            <Box padding={0} sx={{
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '10px',
                margin: '20px',
                width: '90vw'
            }}>
                <center>
                    <SlideShow />
                </center>

                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>

                    <Grid item xs={2} >

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                display: 'flex',
                                minWidth: '75%',
                                borderRadius: '25px',
                                padding: '5px',
                                margin: '20px',
                                textAlign: 'center'
                            }}>
                                <CardActionArea component={Link} to='https://www.linkedin.com/in/jkof86' target="_blank" >
                                    <CardMedia
                                        component="img"
                                        alt="LinkedIn Icon"
                                        image={require("../images/icons/linkedIn_PNG8.png")}
                                    >
                                    </CardMedia>
                                    {/* <CardContent >

                                    </CardContent> */}
                                </CardActionArea>

                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={2} >

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                minWidth: '75%',
                                borderRadius: '25px',
                                padding: '5px',
                                margin: '20px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea component={Link} to='https://github.com/jkof86' target="_blank">
                                    <CardMedia
                                        component="img"
                                        alt="GitHub Icon"
                                        image={require("../images/icons/github_PNG45.png")}
                                    >
                                    </CardMedia>
                                    {/* <CardContent >

                                    </CardContent> */}
                                </CardActionArea>

                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={2} >

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                minWidth: '75%',
                                borderRadius: '25px',
                                padding: '5px',
                                margin: '20px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea component={Link} to='https://www.facebook.com/jason.kofi.1' target="_blank">
                                    <CardMedia
                                        component="img"
                                        alt="Facebook Icon"
                                        image={require("../images/icons/Facebook_Icon_(Official_2).png")}
                                    >
                                    </CardMedia>
                                    {/* <CardContent >

                                    </CardContent> */}
                                </CardActionArea>

                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={2} >

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                minWidth: '75%',
                                borderRadius: '25px',
                                padding: '5px',
                                margin: '20px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea component={Link} to='https://www.instagram.com/jkof86/' target="_blank">
                                    <CardMedia
                                        component="img"
                                        alt="Instagram Icon"
                                        image={require("../images/icons/Instagram_icon.png")}
                                    >
                                    </CardMedia>
                                    {/* <CardContent >

                                    </CardContent> */}
                                </CardActionArea>

                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}

                    <Grid item xs={2} >

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                minWidth: '75%',
                                borderRadius: '25px',
                                padding: '5px',
                                margin: '20px',
                                textAlign: 'center',
                            }}>
                                <CardActionArea component={Link} to='https://www.youtube.com/@jkof86' target="_blank">
                                    <CardMedia
                                        component="img"
                                        alt="Youtube Icon"
                                        image={require("../images/icons/youtube-transparent-png-15.png")}
                                    >
                                    </CardMedia>
                                    {/* <CardContent >

                                    </CardContent> */}
                                </CardActionArea>

                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}

                            </Card >
                        </center>

                    </Grid>

                    {/********************************************************/}
                    {/* 
                    <Grid item xs={3}>

                        <center>
                            <Card sx={{
                                // border: '2px solid black',
                                maxWidth: '75%',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                            }}>
                                {/* <CardActionArea component={Link} to='https://www.youtube.com/@jkof86' target="_blank"> */}
                    {/* <CardMedia>

                                    </CardMedia> */}
                    {/* <CardContent > */}
                    {/* <PDFViewer /> */}
                    {/* </CardContent> */}
                    {/* </CardActionArea> */}

                    {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                    </CardActions> */}

                    {/* </Card > */}
                    {/* </center> */}

                    {/* </Grid> */}
                </Grid>

            </Box>
        </center>

        {/* </Container > */}
    </>);
}