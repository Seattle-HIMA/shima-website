import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Favicon from 'react-favicon';
import './utils/variables.css';

import NavBar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Membership from './Components/MembershipPage/MembershipPage';
import Scholarship from './Components/ScholarshipsPage/ScholarshipsPage';
import EventsPage from './Components/EventsPage/EventsPage';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';
import MyProfile from './Components/ProfilePage/ProfilePage';
import AdminMembersList from "./Components/AdminMembersList/AdminMembersList";
import { AuthenticationGuard } from "./Components/AuthenticationGuard";
import { NotFoundPage } from "./Components/Pages/NotFoundPage";
import MembershipAppForm from './Components/MembershipPage/MembershipAppForm';
import Registration from './Components/RegistrationPage/RegistrationPage';
import { PaymentConfirmPage } from './Components/Pages/PaymentConfirmPage';
import { getAdminStatus } from "./Components/Services/Message.service";

function App() {
    const [showFooter, setShowFooter] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const faviconUrl = "https://i.postimg.cc/CxfDg7Y3/image-13.png";
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        async function addUserToDatabase() {
            try {
                const response = await fetch('/routes/users/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        firstName: user["given_name"],
                        lastName: user["family_name"]
                    }),
                });

                if (response.ok) {
                    console.log('User added to database successfully');
                } else {
                    console.error('Failed to add user to database');
                }
            } catch (error) {
                console.error('Error adding user to database:', error);
            }
        }

        const getAdmin = async () => {
            if (isAuthenticated && !isLoading) {
                const accessToken = await getAccessTokenSilently();
                const {data, error} = await getAdminStatus(accessToken);

                if (!isMounted) return ''
                if (data) setIsAdmin(data.isAdmin);
                if (error) setIsAdmin(false);
            }
        };

        getAdmin();
        addUserToDatabase();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    return (
        <div>
            <Favicon url={faviconUrl}/>
            <header>
                <NavBar isAdmin={isAdmin}/>
            </header>
            <main>
                <Routes>
                    <Route index element={<HomePage setShowFooter={setShowFooter}/>}/>
                    <Route path={'/Membership'} element={<Membership setShowFooter={setShowFooter}/>}/>
                    <Route path={'/ScholarShips'} element={<Scholarship setShowFooter={setShowFooter}/>}/>
                    <Route path={'/Events'} element={<EventsPage setShowFooter={setShowFooter}/>}/>
                    <Route path={'/About'} element={<AboutUs setShowFooter={setShowFooter}/>}/>
                    <Route path="/application-form" element={<MembershipAppForm/>}/>
                    <Route path={'/Registration'} element={<Registration setShowFooter={setShowFooter}/>}/>

                    {/* Protected Routes */}
                    <Route
                        path={"/MyProfile"}
                        element={<AuthenticationGuard
                            component={MyProfile}
                            setShowFooter={setShowFooter}/>}
                    />
                    <Route
                        path={"/ViewMembershipList"}
                        element={<AuthenticationGuard
                            component={AdminMembersList}
                            setShowFooter={setShowFooter}
                            isAdmin={isAdmin}/>}
                    />

                    {/* Page not found */}
                    <Route path="*" element={<NotFoundPage setShowFooter={setShowFooter}/>}/>

                <Route path={"/Payment-Success"} element={<PaymentConfirmPage setShowFooter={setShowFooter}/>} />
            </Routes>

            </main>
            <footer>
                {showFooter && <Footer/>}
            </footer>
        </div>)
}

export default App;