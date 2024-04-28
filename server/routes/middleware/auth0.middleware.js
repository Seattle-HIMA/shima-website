import { config } from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import { AUTH0_DOMAIN, AUTH0_AUDIENCE } from '../../constants.js';

config();

const validateAccessToken = auth({
    issuerBaseURL: `https://${AUTH0_DOMAIN}`,
    audience: AUTH0_AUDIENCE,
    tokenSigningAlg: 'RS256'
});

export {
    validateAccessToken,
};
