import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "./Pages/PageLoader";

export const AuthenticationGuard = ({component: Component, ...rest}) => {
    const AuthenticatedComponent = withAuthenticationRequired(Component, {
        onRedirecting: () => (<div>
            <PageLoader/>
        </div>),
    });

    return <AuthenticatedComponent {...rest} />;
};