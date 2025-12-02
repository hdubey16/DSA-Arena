import express from 'express';
import { login, adminLogin, register, getCurrentUser, logout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/register', register);
router.get('/me', getCurrentUser);
router.post('/logout', logout);

export default router;
