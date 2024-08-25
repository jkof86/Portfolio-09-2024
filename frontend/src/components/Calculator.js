import {
    Box, Container, TextField, Toolbar, Typography, InputAdornment,
    Button, Grid, Divider, Card, CardActions, CardActionArea,
    CardContent, CardMedia, Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,

} from "@mui/material";

import { useState } from "react";

export default function Calculator() {

    const [state, setState] = useState({
        calorieLimit: 0,
        proteinPercent: 0,
        carbPercent: 0,
        fatPercent: 0,

        protein: 0,
        carb: 0,
        fat: 0
    }
    )

    function handleChange(e) {

        //we handle all input fields here
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })

        console.log('Calorie Limit: ', state.calorieLimit,
            'Carb Percent: ', state.carbPercent,
            'Protein Percent: ', state.proteinPercent,
            'Fat Percent: ', state.fatPercent)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Calorie Limit: ', state.calorieLimit,
            'Carb Percent: ', state.carbPercent,
            'Protein Percent: ', state.proteinPercent,
            'Fat Percent: ', state.fatPercent)

        // ..code to submit form to backend here...

    }

    const calculateMacros = () => {

        //we create local variables for calculations
        console.log('Calculate Macros Button Test...');
        let totalPercent = 0;
        let carb = state.carbPercent;
        let protein = state.proteinPercent;
        const fat = state.fatPercent;


        //we calculate the total percent to verify it equals 100%
        totalPercent = (carb + protein + fat);
        console.log(typeof (totalPercent));
        console.log(totalPercent);
        

        (totalPercent === 100) ? calcValid(protein, carb, fat) : calcInvalid(protein, carb, fat);
    }

    const calcValid = (protein, carb, fat) => {
        {
            // print the macronutrient values (in grams)
            // console.log("Carbohydrates: " + state.carb.toFixed(2) + " grams");
            // console.log("Protein: " + state.protein.toFixed(2) + " grams");
            // console.log("Fat: " + state.fat.toFixed(2) + " grams");

            // we calculate the macronutrient values (in grams) given the  entered calorieLimit
            //fat has 9 calories per gram
            fat = (state.calorieLimit * state.proteinPercent / 100.0 / 4.0);

            //carbohydrates has 4 calories per gram
            carb = (state.calorieLimit * state.carbPercent / 100.0 / 4.0);

            //protein has 4 calories per gram
            protein = (state.calorieLimit * state.fatPercent / 100.0 / 9.0);



            //we reset the states back to 0 
            //and pass the saved results into the method for displaying

            setState({
                calorieLimit: 0,
                proteinPercent: 0,
                carbPercent: 0,
                fatPercent: 0,

                protein: 0,
                carb: 0,
                fat: 0
            })

            ShowResults(carb, protein, fat)
        }

    }

    // if total percent != 100...
    const calcInvalid = (protein, carb, fat) => {
        // display error msg
        console.log("Error: Macronutrient % not equal to 100");
        alert("Error: Macronutrient % not equal to 100");

        // print the macronutrient values (in grams)
        console.log("Carbohydrates: " + carb.toFixed(2) + " grams");
        console.log("Protein: " + protein.toFixed(2) + " grams");
        console.log("Fat: " + fat.toFixed(2) + " grams");
    }

    function ShowResults(carb, protein, fat) {
        return (
            <Table sx={{ border: '1px solid black' }}>
                <TableHead sx={{
                    border: '1px solid black',
                    backgroundColor: 'lightgrey',
                }}>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        Carbs
                    </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        Protein
                    </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        Fats</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        {carb.toFixed(2)} grams
                    </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        {protein.toFixed(2)} grams
                    </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        {fat.toFixed(2)} grams
                    </TableCell>
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
                        <TextField
                            required={true}
                            type="number"
                            label="Calorie Limit"
                            variant="standard"
                            name="calorieLimit"
                            // value={state.calorieLimit}
                            onChange={handleChange}
                            // onInput={e => setCalorieLimit(e.target.value)}
                            // onSubmit={e => setCalorieLimit(e.target.value)}
                            sx={{
                                color: 'white',
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    kcal
                                </InputAdornment>,
                            }} />

                        <TextField
                            required={true}
                            type="number"
                            label="Carb Percentage"
                            variant="standard"
                            name="carbPercent"
                            value={state.carbPercent}
                            onChange={handleChange}
                            sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField
                            required={true}
                            type="number"
                            label="Protein Percentage"
                            variant="standard"
                            name="proteinPercent"
                            value={state.proteinPercent}
                            onChange={handleChange}
                            sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField
                            required={true}
                            type="number"
                            label="Fat Percentage"
                            variant="standard"
                            name="fatPercent"
                            value={state.fatPercent}
                            onChange={handleChange}
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
                                onClick={calculateMacros}
                            >
                                Calculate
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
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
                                    Test
                                </CardContent>

                            </CardActionArea>

                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>

                        </Card >
                    </Grid>
                    <Grid item xs={3}>
                        {ShowGraph()}
                    </Grid>

                </Grid>

            </Box>
        </Container>
    </>);
}