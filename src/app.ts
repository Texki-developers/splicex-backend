import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
const fileUpload = require('express-fileupload');
import cors from 'cors';
import { connectDatabase } from './config/databaseConnection';
import { authRoutes, contactRoutes, blogRoutes } from './routes';
import multer from 'multer';
import { subscriptionCron } from './utils/CronJob/Cronjob';

const app: Application = express();

// configure environment variables
require('dotenv').config();

// Middleware
app.use(logger('dev'));

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// parse application/json
app.use('*/images', express.static('./public/uploads'));

// Connect to database
connectDatabase();

subscriptionCron();
// Setup the cors
app.use(cors()); //cors Configuration for development

app.get('/', (req: Request, res: Response) => {
  res.send('Pickmymaid');
});

// Server routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/blog', blogRoutes)



export const rootDir = __dirname;
export { app };