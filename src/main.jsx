import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PdfUpload from './PdfUpload'; // Import your PdfUpload component
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PdfUpload />} /> {/* Renders PdfUpload on root path */}
      {/* Add more routes for other components as needed */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
