import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SalesData from './components/salesdata';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<h2>Lumel Assessment - go to http://localhost:3000/sales</h2>} />
          <Route path='/Sales' element={< SalesData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
