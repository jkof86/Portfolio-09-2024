import {
    Box, Container, TextField, Toolbar, Typography, InputAdornment,
    Button, Grid, Divider, Card, CardActions, CardActionArea,
    CardContent, CardMedia
} from "@mui/material";

export default function Calculator() {

    const [calorieLimit, proteinPercent, carbPercent, fatPercent] = "";

    const CalcResults = () => {
        return (
            <Card sx={{
                border: '2px solid black',
                maxWidthidth: '340',
                borderRadius: '25px',
                margin: '10px',
                padding: '10px',
                textAlign: 'center'
            }}>
                <CardMedia
                    component="img"
                    alt="Protein/Carbs/Fat - Pie Chart"
                    image={require("../images/macros.jpg")}
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Macronutrient Results
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </Typography>
                </CardContent>

                <CardActions>
                    <Box sx={{ border: '1px solid black', textAlign: 'center' }}>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </Box>
                </CardActions>

            </Card>
        )
    }

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
                width: '100%'
            }}>

                <Grid container spacing={2}>
                    <Grid item xs={4}
                        sx={{ alignContent: 'center' }}>
                        <TextField id="calorieLimitInput"
                            required='true'
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            type="number"
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

                        <Box textAlign={'center'}>
                            <Button variant="contained"
                                id="calculateButton"
                                type="submit"
                                onClick={() => {
                                    { calculateMacros() };
                                    console.log('Calculate Macros Button Test...');
                                }
                                } >
                                Calculate
                            </Button>
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        {CalcResults()}
                    </Grid>

                </Grid>

            </Box>
        </Container>
    </>);
}