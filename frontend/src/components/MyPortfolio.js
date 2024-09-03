import { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from '../misc/jkof86_portfolio.pdf';
import { Button, Box } from '@mui/material';


export default function MyPortfolio() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [width, setWidth] = useState(null);
    const pdfWrapper = useRef(null);

    // const styles = StyleSheet.create({
    //     page: {
    //       flexDirection: 'column',
    //       padding: 10,
    //     },
    //     section: {
    //       margin: 10,
    //       padding: 10,
    //       flexGrow: 1,
    //     },
    //   });

    // we use this to dynamically update the pdf width on resize
    useEffect(() => {
        const updateWidth = () => {
            if (pdfWrapper.current) {
                setWidth(pdfWrapper.current.getBoundingClientRect().width);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function previousPage() {
        pageNumber <= 1 ? alert("You're at the beginning of the Document") : setPageNumber(pageNumber - 1);
    }

    function nextPage() {
        pageNumber >= numPages ? alert("You're at the end of the Document") : setPageNumber(pageNumber + 1);
    }


    return (<>
        {/*we add a scroll bar to deal with PDF document overflow*/}
        <div ref={pdfWrapper} style={{ width: '100%', height: '100vh', overflow: 'scroll' }}>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <Box>
                <Button variant='contained' onClick={previousPage}
                    sx={{ margin: ['10px'] }}>
                    previous
                </Button>
                <Button variant='contained' onClick={nextPage}
                    sx={{ margin: ['10px'] }}>
                    Next
                </Button>

                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                        // size={{
                        // flexDirection: 'column',
                        // padding: 10,
                        // width: window.innerWidth*2,
                        // height: window.innerHeight / 2
                        // height: '20%'
                        // }}
                        pageNumber={pageNumber}
                        width={width}
                    />

                </Document>
            </Box>
        </div>
    </>);
}