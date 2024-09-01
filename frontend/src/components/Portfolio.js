import pdfFile from '../misc/jkof86_portfolio.pdf';
import React from 'react';
import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'pdfjs';

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

export default function Portfolio() {
    
  return(<><Document file={pdfFile}>
    <Page pageNumber={1} />
  </Document>
  </>)
};

