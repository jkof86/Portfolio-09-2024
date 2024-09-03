import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from '../misc/jkof86_portfolio.pdf';
import { Button, Box } from '@mui/material';


export default function MyPortfolio() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

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
        <div>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <Box>
                <Button variant='contained' onClick={previousPage}
                sx={{margin:['10px']}}>
                    previous
                </Button>
                <Button variant='contained' onClick={nextPage} 
                sx={{margin:['10px']}}>
                    Next
                </Button>

                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
            </Box>

        </div>
    </>);
}