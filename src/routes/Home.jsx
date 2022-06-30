import React from "react";
import { Link } from "react-router-dom";

import './css/home.css'

function Home(){
    return <div className="Home">
        <header>
        <Link to="./login"><button className="login-btn">Login</button></Link>
        </header>

        <div className="app-body">
            <div className="cont-one">
                <h1>We've got <br /> you <br /> covered</h1>
                <Link to="./register"><button className="register-btn">Get your link</button></Link>
            </div>
            <div className="cont-two">
            <img src={require('./anmgif.gif')} />
            </div>
            

        </div>
    </div>
}
export default Home;