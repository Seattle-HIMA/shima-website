import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Modal from "react-modal";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from './constants';
import './index.css';
import App from './App';

Modal.setAppElement('#root');

const auth0Domain = AUTH0_DOMAIN;
const auth0ClientId = AUTH0_CLIENT_ID;
const redirectUri = window.location.origin;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
            redirect_uri: redirectUri
        }}
    >
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Auth0Provider>
);
