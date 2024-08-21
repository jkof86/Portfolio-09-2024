import {
    Box, Container, TextField, Toolbar, Typography, InputAdornment,
    Button, Grid, Divider, Card, CardActions, CardActionArea,
    CardContent, CardMedia, Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@mui/material";

import { useState } from "react";

export default function Calculator() {

    const [calorieLimit, setCalorieLimit] = useState('');
    const [proteinPercent, setProteinPercent] = useState('');
    const [carbPercent, setCarbPercent] = useState('');
    const [fatPercent, setFatPercent] = useState('');

    function handleClick() {
        // event.preventDefault();
        // console.log('Calorie Limit: ', calorieLimit,
        //     'Protein Percent: ', proteinPercent,
        //     'Carb Percent: ', carbPercent,
        //     'Fat Percent: ', fatPercent)

        // ..code to submit form to backend here...

    }

    const calculateMacros = () => {
        console.log('Calculate Macros Button Test...');
        console.log('Calorie Limit: ', calorieLimit,
            'Protein Percent: ', proteinPercent,
            'Carb Percent: ', carbPercent,
            'Fat Percent: ', fatPercent)

        return (
            <Table sx={{ border: '2px solid black' }}>
                <TableHead>
                    <TableCell>Protein</TableCell>
                    <TableCell>Carbs</TableCell>
                    <TableCell>Fat</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell>{proteinPercent}grams</TableCell>
                    <TableCell>{carbPercent}grams</TableCell>
                    <TableCell>{fatPercent}grams</TableCell>
                </TableBody>
            </Table>

        )

    }

    const ShowGraph = () => {
        return (
            <Card sx={{
                maxWidthidth: '340',
                borderRadius: '25px',
                margin: '10px',
                padding: '10px',
                textAlign: 'center'
            }}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        alt="Protein/Carbs/Fat - Pie Chart"
                        image={require("../images/pie_chart_example.jpg")}
                    >
                    </CardMedia>
                    <CardContent>


                    </CardContent>

                </CardActionArea>

            </Card >
        )
    }


    const ShowResults = () => {
        return (
            <Card sx={{
                border: '2px solid black',
                maxWidthidth: '340',
                borderRadius: '25px',
                margin: '10px',
                padding: '10px',
                textAlign: 'center'
            }}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        alt="Macronutrient Image"
                        image={require("../images/macros.jpg")}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Macronutrient Results
                        </Typography>
                        {calculateMacros()}
                        {/* <Table sx={{border:'2px solid black'}}>
                            <TableHead>
                                <TableCell>Protein</TableCell>
                                <TableCell>Carbs</TableCell>
                                <TableCell>Fat</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableCell>{proteinPercent}grams</TableCell>
                                <TableCell>{carbPercent}grams</TableCell>
                                <TableCell>{fatPercent}grams</TableCell>
                            </TableBody>
                        </Table> */}
                    </CardContent>

                </CardActionArea>

                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>

            </Card >
        )
    }

    return (<>
        <Toolbar sx={{
            // flexGrow: 1,
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
                Calorie / Macronutrient Calculator
            </Typography>
        </Toolbar>
        <Container sx={{ width: '99%' }}>

            <Box component='form' sx={{
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

                {/* for each TextField, we use onInput to store the values */}
                <Grid container spacing={2}>
                    <Grid item xs={2}
                        sx={{ alignContent: 'center' }}>
                        <TextField id="calorieLimitInput"
                            required={true}
                            type="number"
                            label="Calorie Limit"
                            variant="standard"
                            onInput={e => setCalorieLimit(e.target.value)}
                            sx={{
                                color: 'white',
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    kcal
                                </InputAdornment>,
                            }} />

                        <TextField id="proteinPercentInput"
                            required={true}
                            type="number"
                            label="Protein Percentage"
                            variant="standard"
                            onInput={e => setProteinPercent(e.target.value)}
                            sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField id="carbPercentInput"
                            required={true}
                            type="number"
                            label="Carb Percentage"
                            variant="standard"
                            onInput={e => setCarbPercent(e.target.value)}
                            sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField id="fatPercentInput"
                            required={true}
                            type="number"
                            label="Fat Percentage"
                            variant="standard"
                            onInput={e => setFatPercent(e.target.value)}
                            sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <Divider sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            borderBottomWidth: '2px',
                            borderColor: 'black'
                        }} />

                        <Box textAlign={'center'}>
                            <Button variant="contained"
                                id="calculateButton"
                                // type="submit"
                                onClick={() => {
                                    { calculateMacros() };
                                }
                                } >
                                Calculate
                            </Button>
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        {ShowResults()}
                    </Grid>
                    <Grid item xs={4}>
                        {ShowGraph()}
                    </Grid>

                </Grid>

            </Box>
        </Container>
    </>);
}