import { config } from 'dotenv';
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';
import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '../../constants.js';

config();

const validateAccessToken = auth({
    issuerBaseURL: `https://${AUTH0_DOMAIN}`, audience: AUTH0_AUDIENCE, tokenSigningAlg: 'RS256'
});

const checkRequiredPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        console.log(requiredPermissions);
        const permissionCheck = claimCheck((payload, req) => {
            const permissions = payload.permissions || [];
            const hasPermissions = requiredPermissions.every((requiredPermission) => permissions.includes(requiredPermission));

            if (!hasPermissions) {
                throw new InsufficientScopeError();
            }

            return hasPermissions;
        });

        permissionCheck(req, res, next);
    };
}

const checkIfAdminPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        const permissionCheck = claimCheck((payload) => {
            const permissions = payload.permissions || [];
            req.isAdmin = requiredPermissions.every((requiredPermission) => permissions.includes(requiredPermission));

            return true;
        })

        permissionCheck(req, res, next);
    }
}

export {
    validateAccessToken, checkRequiredPermissions, checkIfAdminPermissions
};
