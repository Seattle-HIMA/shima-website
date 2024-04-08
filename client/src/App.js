import React, {useEffect, useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Membership from './Components/MembershipPage/MembershipPage';
import Workshops from './Components/WorkshopsPage/WorkshopsPage';
import Scholarship from './Components/ScholarshipsPage/ScholarshipsPage';
import EventsPage from './Components/EventsPage/EventsPage';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

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
                    <Route path='/Membership' element={<Membership/>}></Route>
                    <Route path='/ScholarShips' element={<Scholarship/>}></Route>
                    <Route path='/Events' element={<EventsPage/>}></Route>
                    <Route path='/About' element={<AboutUs/>}></Route>
                    <Route path='/LogIn' element={<Login/>}></Route>
                    <Route path='/SignUp' element={<SignUp/>}></Route>
                </Routes>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default App;