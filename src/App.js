import React from "react";
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Register from "./routes/register";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import UserLinks from "./routes/userLinks";
import Logout from "./routes/logout";
import Home from "./routes/Home";

import './App.css';
// import logo from './anm.jpg'

function App() {
  return <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/links/:userid" element={<UserLinks />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
      

  </div>
}

export default App;
