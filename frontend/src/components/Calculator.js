import {
    Box, Container, TextField, Toolbar, Typography, InputAdornment,
    Button, Grid, Divider, Card, CardActions, CardActionArea,
    CardContent, CardMedia, Table,
    TableHead,
    TableBody,
    TableCell,

} from "@mui/material";
import { useState } from "react";

export default function Calculator() {

    const [state, setState] = useState({
        calorieLimit: "",
        proteinPercent: "",
        carbPercent: "",
        fatPercent: ""
    })

    function resetState() {
        //we reset the states back to default values
        setState({
            calorieLimit: "",
            proteinPercent: "",
            carbPercent: "",
            fatPercent: ""
        })
    }

    function handleClick() {
        //we do some custom validation for our Textfield values
        //if any fields are left empty, the calc is invalid
        !state.calorieLimit || !state.proteinPercent ||
            !state.carbPercent || !state.fatPercent ?
            calcInvalid() : calculateMacros();

        // console.log('Calorie Limit: ', state.calorieLimit,
        //     'Carb Percent: ', state.carbPercent,
        //     'Protein Percent: ', state.proteinPercent,
        //     'Fat Percent: ', state.fatPercent)

        // code to submit form to backend here...
    }

    function handleChange(e) {
        //we handle all input fields here
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })

        // console.log('Calorie Limit: ', state.calorieLimit,
        //     'Carb Percent: ', state.carbPercent,
        //     'Protein Percent: ', state.proteinPercent,
        //     'Fat Percent: ', state.fatPercent)
    }


    const calculateMacros = () => {

        //we create local variables for calculations
        console.log('Calculate Macros Button Test...');
        
        //we add ternary operation in case of empty values
        //this forces the type to a number

        var calorieLimit = state.calorieLimit ? state.calorieLimit : 0;
        var carb = state.carbPercent ? state.carbPercent : 0;
        var protein = state.proteinPercent ? state.proteinPercent : 0;
        var fat = state.fatPercent ? state.fatPercent : 0;
        var totalPercent = 0;

        //after storing the values locally
        //we reset the states back to 0 
        resetState();

        //we calculate the total percent to verify it equals 100%
        // totalPercent = Number(Number(carb) + Number(protein) + Number(fat));
        totalPercent = (Number(carb) + Number(protein) + Number(fat));
        // totalPercent = Number((carb) + (protein) + (fat));

        console.log(typeof (totalPercent));
        console.log(totalPercent);

        (totalPercent === 100) ? calcValid(calorieLimit, protein, carb, fat) : calcInvalid();
    }

    const calcValid = (calorieLimit, protein, carb, fat) => {
        {
            console.log("calorieLimit: ", calorieLimit)
           
           // we calculate the macronutrient values (in grams) 
           // given the entered calorieLimit
            
           //protein has 4 calories per gram
            protein = (calorieLimit * protein / 100.0 / 4.0);

            //carbohydrates has 4 calories per gram
            carb = (calorieLimit * carb / 100.0 / 4.0);

            //fat has 9 calories per gram
            fat = (calorieLimit * fat / 100.0 / 9.0);

            //we reset state and
            //we pass the saved results into the method for displaying
            resetState();
            ShowResults(protein, carb, fat);
        }

    }

    // if total percent != 100...
    const calcInvalid = () => {
        //first we reset the state
        resetState();

        // print the macronutrient values (in grams)
        // console.log("Carbohydrates: " + carb.toFixed(2) + " grams");
        // console.log("Protein: " + protein.toFixed(2) + " grams");
        // console.log("Fat: " + fat.toFixed(2) + " grams");

        // display error msg
        console.log("Error: Macronutrient % not equal to 100");
        alert("Error: Macronutrient % not equal to 100");
    }

    function ShowResults(protein, carb, fat) {
        //print the macronutrient values (in grams)
        console.log("Carbohydrates: " + carb.toFixed(2) + " grams");
        console.log("Protein: " + protein.toFixed(2) + " grams");
        console.log("Fat: " + fat.toFixed(2) + " grams");

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
                            value={state.calorieLimit}
                            onChange={handleChange}
                            // onInput={e => setCalorieLimit(e.target.value)}
                            // onSubmit={handleChange}
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
                            onSubmit={handleChange}
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
                            // onSubmit={handleChange}
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
                            // onSubmit={handleChange}
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
                                type="button"
                                onClick={handleClick}
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