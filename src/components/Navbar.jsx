import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
    return (
     <nav className='NavBar'>   
     <div className='nav -left'>The Planner</div>                          
             <ul        className='nav-links'>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/email"> AI Email     </Link></li>
                <li><Link to="/calendar" >Calendar</Link></li>
                <li> <Link to="/tasks">Tasks</Link></li>
                
            </ul>
     </nav>
  
    );
}
    
