import { Document, Page } from 'react-pdf';
import portfolio from '../misc/jkof86_portfolio.pdf';
import { useState } from 'react';
import "../../node_modules/pdfjs-dist/build/pdf.worker.mjs";

export default function PDFViewer() {

    const [numPages, setNumPages] = useState(null)

    function onDocumentSuccess({ numPages }) {
        setNumPages(numPages)
    }
    return (<>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '700px', border: '1px solid black' }}>
                <Document file={portfolio} onLoadSuccess={onDocumentSuccess}>
                    {Array(numPages).fill().map((_, i) => (
                        <Page pageNumber={i + 1} />
                    ))}
                </Document>
            </div>
        </div>
    </>)
}