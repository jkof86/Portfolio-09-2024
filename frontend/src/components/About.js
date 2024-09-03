import React from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from '../oldComponents/PDFViewer';
import { Box, Container, TextField, Toolbar, Typography } from "@mui/material";
import MyPortfolio from "./MyPortfolio";

// import { PDFViewer } from '@react-pdf/renderer';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';



export default function About() {

    return (<>
        <Toolbar sx={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: 'grey',
            border: '1px solid black',
            boxShadow: '0px 0px 2px 2px white',
            marginBottom: '10px',
            padding: '10px',
            width: '100%',
            // height: '2vh'
        }}>
            <Typography sx={{
                fontSize: '20px',
                fontStyle: 'bold'
            }}>
                About
            </Typography>
        </Toolbar>

        {/* *****************************************************/}

        <center>
            <Box padding={0} sx={{
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '25px',
                border: '1px solid black',
                boxShadow: '0px 0px 2px 2px white',
                padding: '20px',
                margin: '20px',
                width: '75vw',
            }}>
                <MyPortfolio />
            </Box>
        </center>
    </>);
};

// ReactDOM.render(<About />, document.getElementById('root'));