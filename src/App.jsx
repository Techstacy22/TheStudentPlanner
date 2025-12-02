import React from 'react';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Email from './pages/Email';
import Calendar from './pages/Calendar';
import Task from './pages/Tasks';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return(     
    <Router> 
         <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/email' element={<Email />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/tasks' element={<Task/>} />
      </Routes>
     </Router>
       );
}  