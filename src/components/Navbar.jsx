import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBook, FaCalendarAlt, FaTasks, FaHome, FaRobot } from 'react-icons/fa';


export default function Navbar() {
    return (
     <nav className='NavBar'>   
     <div className='nav-left'>The Planner
        <FaBook className='Nav-icon1' /> 
    </div>                          
             <ul        className='nav-links'>
                <li>
                    <Link className='Nav-item' to="/" >Home
                          <FaHome className='Nav-icon' />
                    </Link>   
                </li>
                <li>    
                    <Link className='Nav-item' to="/email"> AI Email    
                        <FaRobot className='Nav-icon' />
                    </Link>
                 </li>
                <li>    
                    <Link className='Nav-item'to="/calendar" >Calendar  
                        <FaCalendarAlt className='Nav-icon' />
                    </Link>   
                </li>
                <li>
                    <Link  className='Nav-item' to="/tasks">Tasks
                        <FaTasks className='Nav-icon' />
                    </Link>
                </li>
                
            </ul>
     </nav>
  
    );
}
    
