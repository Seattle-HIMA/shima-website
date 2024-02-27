import React, {useEffect, useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Membership from './Components/MembershipPage/MembershipPage';
import ResourcesPage from './Components/ResourcesPage/ResourcesPage';
import EventsPage from './Components/EventsPage/EventsPage';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';

import './utils/variables.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <Routes>
                    <Route index element={<HomePage/>}></Route>
                    <Route path="/Membership" element={<Membership/>}></Route>
                    <Route path="/Scholarships" element={<ResourcesPage/>}></Route>
                    <Route path="/Events" element={<EventsPage/>}></Route>
                    <Route path="/About" element={<AboutUs/>}></Route>
                </Routes>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
}

export default App;