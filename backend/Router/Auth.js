import express from 'express'
import { login, register } from '../Controller/AuthController.js';
import { verifyToken } from '../Utility/VerifyToken.js';

const authRoutes =express.Router();


// http://localhost:8000/api/auth
// register
authRoutes.route('/registered').post(register)

// http://localhost:8000/api/auth/login
// login
authRoutes.route('/login').post(login);

export default authRoutes;