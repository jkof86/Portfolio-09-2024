import React from 'react';
import { Box, Toolbar, Typography } from "@mui/material";
import MyPortfolio from "./MyPortfolio";
import NavDrawerProfessional from './navigation/NavDrawerProfessional';

// import { PDFViewer } from '@react-pdf/renderer';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

export default function About() {

    return (<>
        {<NavDrawerProfessional />}

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
                // height: '85vh'
            }}>
                <MyPortfolio />
            </Box>
        </center>
    </>);
};