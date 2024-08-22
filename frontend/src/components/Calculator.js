import {
    Box, Container, TextField, Toolbar, Typography, InputAdornment,
    Button, Grid, Divider, Card, CardActions, CardActionArea,
    CardContent, CardMedia, Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    ownerDocument
} from "@mui/material";

import { useRef, useState } from "react";

export default function Calculator() {

    const [calorieLimit, setCalorieLimit] = useState(0);
    const [proteinPercent, setProteinPercent] = useState(0);
    const [carbPercent, setCarbPercent] = useState(0);
    const [fatPercent, setFatPercent] = useState(0);
    var [protein, setProtein] = useState(0);
    var [carb, setCarb] = useState(0);
    var [fat, setFat] = useState(0);

    function handleClick() {
        // event.preventDefault();
        // console.log('Calorie Limit: ', calorieLimit,
        //     'Protein Percent: ', proteinPercent,
        //     'Carb Percent: ', carbPercent,
        //     'Fat Percent: ', fatPercent)

        // ..code to submit form to backend here...

    }

    const calcValid = () => {
        {
            // calculate the macronutrient values (in grams) given the  entered calorieLimit

            //fat has 9 calories per gram
            protein = (calorieLimit * proteinPercent / 100.0 / 4.0);

            //carbohydrates has 4 calories per gram
            carb = (calorieLimit * carbPercent / 100.0 / 4.0);

            //protein has 4 calories per gram
            fat = (calorieLimit * fatPercent / 100.0 / 9.0);

             // print the macronutrient values (in grams)
             console.log("Protein: " + protein.toFixed(2) + " grams");
             console.log("Carbohydrates: " + carb.toFixed(2) + " grams");
             console.log("Fat: " + fat.toFixed(2) + " grams");
            
        }

    }

    // if total percent != 100...
    const calcInvalid = () => { console.log("Error: Macronutrient % not equal to 100"); }

    const calculateMacros = () => {

        console.log('Calculate Macros Button Test...');

        //we need to cast each value as a number to avoid concatenation
        var totalPercent = (Number(proteinPercent) + Number(carbPercent) + Number(fatPercent));
        // console.log(totalPercent);  

        (totalPercent === 100) ? calcValid() : calcInvalid();

        return (
            <Table sx={{ border: '1px solid black' }}>
                <TableHead sx={{
                    border: '1px solid black',
                    backgroundColor: 'lightgrey',
                }}>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Carbs</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Protein</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Fats</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{protein.toFixed(2)} grams</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{carb.toFixed(2)} grams</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{fat.toFixed(2)} grams</TableCell>
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
                // border: '2px solid black',
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

        <Container sx={{ width: '100%' }}>

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
                    <Grid item xs={3}
                        sx={{ alignContent: 'center' }}>
                        <TextField id="calorieLimitInput"
                            required='true'
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

                        <TextField id="carbPercentInput"
                            required='true'
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

                        <TextField id="proteinPercentInput"
                            required='true'
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

                        <TextField id="fatPercentInput"
                            required='true'
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
                    <Grid item xs={3}>
                        {ShowGraph()}
                    </Grid>

                </Grid>

            </Box>
        </Container>
    </>);
}