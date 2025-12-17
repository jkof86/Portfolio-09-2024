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

import banner from '../images/bg/ksBanner04.jpeg';
import BasicTabs from "./navigation/BasicTabs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./navigation/Navbar";

export default function Home() {

    //we use this to handle component redirects after validation
    //useEffect ensures the component doesn't refresh inifinitely
    const GoToHome = () => {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/home')
        }, [])
    }
    const GoToLogin = () => {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/login')
        }, [])
    }

    const validateUser = () => {

        if (localStorage.getItem("isLoggedIn")) {
            console.log("The user IS logged in")
            return true
        }
        else {
            console.log("The user IS NOT logged in")
            return false
        }
    }

    return (<>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: 'auto',
                // marginTop: 0
            }}>
        </Box>
        {validateUser() ? GoToHome() : GoToLogin()}

        <center>
            <Toolbar sx={{
                justifyContent: 'center',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
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

            <Navbar />

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