import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

//post to /api/auth/login
authRouter.post('/login', authenticateToken, login);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
