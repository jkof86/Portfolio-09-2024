import { 
    Box, Container, TextField, 
    Toolbar, Typography, InputAdornment } from "@mui/material";

export default function Calculator() {

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
            <Typography sx={{ fontSize:'20px',
            fontStyle:'bold'}}>
                Calorie / Macronutrient Calculator
            </Typography>
        </Toolbar>
        <Container fixed>
            <Box component='form' sx={{
                flexGrow:1,
                justifyContent: 'center',
                backgroundColor: 'grey',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '10px',
                width: '100%'
            }}>
                <TextField id="calorieLimitInput" 
                label="Calorie Limit"
                variant="standard" sx={{
                    color:'white',
                    margin:'5px'
                }} InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        kcal
                        </InputAdornment>,
                  }}/>

                <TextField id="proteinPercentInput" 
                label="Protein Percentage"
                variant="standard" sx={{
                    margin:'5px'
                }} InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        %
                        </InputAdornment>,
                  }} />

                <TextField id="carbPercentInput" 
                label="Carb Percentage"
                variant="standard" sx={{
                    margin:'5px'
                }} InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        %
                        </InputAdornment>,
                  }} />

                <TextField id="fatPercentInput" 
                label="Fat Percentage"
                variant="standard" sx={{
                    margin:'5px'
                }} InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        %
                        </InputAdornment>,
                  }} />
                
            </Box>
        </Container>
    </>);
}