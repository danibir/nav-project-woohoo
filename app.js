import express from 'express';
import mongoose from 'mongoose';
import { hostname } from 'os';

import router from './routers/main_router.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000 and on', hostname());
});