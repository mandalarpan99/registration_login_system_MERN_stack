import {NavLink} from "react-router-dom";
import { useAuth } from "../store/auth";
export const Navbar = ()=>{

    const {isLoggedIn} = useAuth();
    //console.log("from navbar", isLoggedIn);
    return <>
        <header>
            <nav>
                <div className="grid-container">
                    <div className="nav-img">
                        <a href="/">Arpan</a>
                    </div>
                    <div className="nav-link">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/service">Service</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            {isLoggedIn ? (
                            <li><NavLink to="/logout">Logout</NavLink></li> 
                            ) : (
                            <>
                            <li><NavLink to="/registration">Register</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li> 
                            </>
                        )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>
};



