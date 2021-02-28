import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { router as authRouter } from './routes/loginRoutes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['hoss'] }));

app.use(authRouter);

app.listen(5000, () => console.log(`Express app`));
