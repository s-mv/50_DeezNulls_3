import React from 'react';
import "./navbar.css";
import search_light from "../../assets/search-w.png";
import search_dark from "../../assets/search-b.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import Recruiter from '../pages/recruiter';

const Navbar = (props) => {
    const toggleTheme = () => {
        props.theme == "light" ? props.setTheme("dark") : props.setTheme("light");
    }

    return (
        <div className="container">
            <div className={`navbar ${props.theme}`}>
                <h1><a href="/">TalentHub</a></h1>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li><button>Login/SignUp</button></li>
                </ul>

                <div className={`search-box ${props.theme}`}>
                    <input type="text" placeholder='Search...' />
                    <img src={props.theme == "light" ? search_light : search_dark} alt="" />
                </div>

                <img src={props.theme == "light" ? toggle_light : toggle_dark} alt="" className='toggle-icon' onClick={toggleTheme} />
            </div>
            <div className='body'>
                <Recruiter />
            </div>
        </div>
    )
}

export default Navbar;
