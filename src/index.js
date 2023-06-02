import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dash from './assets/components/Dahs';
import DataSubmittedSoFar from './DataSubmittedSoFar';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/wnsgs/raw" element={<DataSubmittedSoFar />} />
      <Route path="/wnsgs/*" element={<Dash />} />
     
    </Routes>
  </BrowserRouter>
);
