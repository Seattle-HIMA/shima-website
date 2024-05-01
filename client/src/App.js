import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Favicon from 'react-favicon';

import NavBar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Membership from './Components/MembershipPage/MembershipPage';
import Scholarship from './Components/ScholarshipsPage/ScholarshipsPage';
import EventsPage from './Components/EventsPage/EventsPage';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';
import LoginPage from './Components/LoginPage/LoginPage';
import SignUp from './Components/SignUp/SignUp';
import MyProfile from './Components/ProfilePage/ProfilePage';
import AdminMembersList from "./Components/AdminMembersList/AdminMembersList";

import './utils/variables.css';
import { AuthenticationGuard } from "./Components/AuthenticationGuard";
import { NotFoundPage } from "./Components/Pages/NotFoundPage";

function App() {
    const [showFooter, setShowFooter] = useState(true);

    const [faviconUrl, setFaviconUrl] = useState("https://i.postimg.cc/CxfDg7Y3/image-13.png");

    return (<div>
        <Favicon url={faviconUrl}/>
        <header>
            <NavBar/>
        </header>
        <main>
            <Routes>
                <Route index element={<HomePage setShowFooter={setShowFooter}/>}/>
                <Route path={'/Membership'} element={<Membership setShowFooter={setShowFooter}/>}/>
                <Route path={'/ScholarShips'} element={<Scholarship setShowFooter={setShowFooter}/>}/>
                <Route path={'/Events'} element={<EventsPage setShowFooter={setShowFooter}/>}/>
                <Route path={'/About'} element={<AboutUs setShowFooter={setShowFooter}/>}/>
                <Route path={'/LogIn'} element={<LoginPage setShowFooter={setShowFooter}/>}/>
                <Route path={'/SignUp'} element={<SignUp setShowFooter={setShowFooter}/>}/>

                {/* Protected Routes */}
                <Route
                    path={"/MyProfile"}
                    element={<AuthenticationGuard component={MyProfile} setShowFooter={setShowFooter}/>}
                />
                <Route
                    path={"/ViewMembershipList"}
                    element={<AuthenticationGuard component={AdminMembersList} setShowFooter={setShowFooter}/>}
                />

                {/* Page not found */}
                <Route path="*" element={<NotFoundPage setShowFooter={setShowFooter}/>}/>

            </Routes>

        </main>
        <footer>
            {showFooter && <Footer/>}
        </footer>
    </div>)
}

export default App;