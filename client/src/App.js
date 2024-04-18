import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Membership from './Components/MembershipPage/MembershipPage';
import Scholarship from './Components/ScholarshipsPage/ScholarshipsPage';
import EventsPage from './Components/EventsPage/EventsPage';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';
import LoginPage from './Components/LoginPage/LoginPage';
import SignUp from './Components/SignUp/SignUp';

import './utils/variables.css';

// eslint-disable-next-line
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const [showFooter, setShowFooter] = useState(true);

    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <Routes>
                    <Route index element={<HomePage setShowFooter={setShowFooter}/>}/>
                    <Route path='/Membership' element={<Membership setShowFooter={setShowFooter}/>}/>
                    <Route path='/ScholarShips' element={<Scholarship setShowFooter={setShowFooter}/>}/>
                    <Route path='/Events' element={<EventsPage setShowFooter={setShowFooter}/>}/>
                    <Route path='/About' element={<AboutUs setShowFooter={setShowFooter}/>}/>
                    <Route path='/LogIn' element={<LoginPage setShowFooter={setShowFooter}/>}/>
                    <Route path='/SignUp' element={<SignUp setShowFooter={setShowFooter}/>}/>
                </Routes>
            </main>
            <footer>
                {showFooter && <Footer/>}
            </footer>
        </div>
    )
}

export default App;