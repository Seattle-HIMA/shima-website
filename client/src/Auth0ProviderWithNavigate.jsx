import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH0_AUDIENCE, AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "./constants";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const domain = AUTH0_DOMAIN;
    const clientId = AUTH0_CLIENT_ID;
    const redirectUri = AUTH0_CALLBACK_URL;
    const audience = AUTH0_AUDIENCE;

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri && audience)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
