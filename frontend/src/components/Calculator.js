import {
    Box, Container, TextField,
    Toolbar, Typography, InputAdornment,
    Button, Grid,
    Divider
} from "@mui/material";

export default function Calculator() {

    const [calorieLimit, proteinPercent, carbPercent, fatPercent] = "";

    const calculateMacros = () => {

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
            width: '99%'
        }}>
            <Typography sx={{
                fontSize: '20px',
                fontStyle: 'bold'
            }}>
                Calorie / Macronutrient Calculator
            </Typography>
        </Toolbar>
        <Container sx={{ margin: '10px', width: '90%' }}>

            <Box component='form' sx={{
                flexGrow: 1,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '10px',
                width: '100%'
            }}>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField id="calorieLimitInput"
                            required='true'
                            label="Calorie Limit"
                            variant="standard" sx={{
                                color: 'white',
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    kcal
                                </InputAdornment>,
                            }} />

                        <TextField id="proteinPercentInput"
                            required='true'
                            label="Protein Percentage"
                            variant="standard" sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField id="carbPercentInput"
                            required='true'
                            label="Carb Percentage"
                            variant="standard" sx={{
                                margin: '5px'
                            }} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    %
                                </InputAdornment>,
                            }} />

                        <TextField id="fatPercentInput"
                            required='true'
                            label="Fat Percentage"
                            variant="standard" sx={{
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

                        <Box textAlign={'right'}>
                            <Button variant="contained" id="calculateButton"
                                onClick={() => {
                                    { calculateMacros() };
                                    console.log('Calculate Macros Button Test...');
                                }
                                } >
                                Calculate
                            </Button>
                        </Box>

                    </Grid>
                    <Grid item xs={4}>
                    </Grid>

                </Grid>




                <br />



                <br />


                <br />




            </Box>
        </Container>
    </>);
}