import express from 'express';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import cors from 'cors';
import 'dotenv/config'
import apiRouter from './routes/routes.js';
import models from './models.js';
import { CLIENT_ORIGIN_URL, PORT } from './constants.js';

dotenv.config();

if (!(PORT && CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables. Check docs for more info.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
});

app.use(nocache());

app.use(cors({
    origin: CLIENT_ORIGIN_URL, methods: ["GET"], allowedHeaders: ["Authorization", "Content-Type"], maxAge: 86400,
}));

// mongodb middleware
app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/routes', apiRouter);


export default app;