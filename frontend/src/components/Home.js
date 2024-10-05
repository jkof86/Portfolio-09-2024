import React from "react";
import {
    Box, Toolbar, 
    Grid, Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions
}
    from "@mui/material";

import banner from '../images/photos/banner03.png';
import BasicTabs from "./navigation/BasicTabs";

export default function Home() {

    return (<>
        <center>
             <Toolbar sx={{
                justifyContent: 'center',
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
                padding: '10px',
                margin: '20px',
                width: '75vw'
            }}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <h3>RSS Feeds</h3>
                        <Card sx={{
                            border: '2px solid black',
                            maxWidth: '100%',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '10px',
                            textAlign: 'center',
                        }}>
                            <CardActionArea>
                                <CardMedia>
                                    <CardContent>
                                        {<BasicTabs />}
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* *****************************************/}

                    {/* <Grid item xs={3}>
                        <h3>Grid Item 2</h3>
                        <Card sx={{
                            border: '2px solid black',
                            maxWidth: '100%',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '10px',
                            textAlign: 'center',
                        }}>
                            <CardActionArea>
                                <CardMedia>
                                    <CardContent>
                                        {<RSSFeed />}
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* *****************************************/}

                   {/* <Grid item xs={3}>
                        <h3>Grid Item 3</h3>
                        <Card sx={{
                            border: '2px solid black',
                            maxWidth: '100%',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '10px',
                            textAlign: 'center',
                        }}>
                            <CardActionArea>
                                <CardMedia>
                                    <CardContent>
                                        {<RSSFeed />}
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                     </Grid> */}

                    {/* *****************************************/}

                    {/* <Grid item xs={3}>
                        <h3>Grid Item 4</h3>
                        <Card sx={{
                            border: '2px solid black',
                            maxWidth: '100%',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '10px',
                            textAlign: 'center',
                        }}>
                            <CardActionArea>
                                <CardMedia>
                                    <CardContent>
                                        {<RSSFeed />}
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid> */}
                    
                </Grid>
            </Box>
        </center>
    </>);
}