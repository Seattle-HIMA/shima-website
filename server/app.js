import express from 'express';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import apiRouter from './routes/routes.js';
import models from './models.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// mongodb middleware
app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use('/routes', apiRouter);

export default app;