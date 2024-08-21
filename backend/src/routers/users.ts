/**
 * Routes pour répertorier les membres de l'association.
 */

import express, { Router, Request, Response } from "express";
import { authenticateToken } from "../middlewares";
import { register, login, getAllUsers, getUserById, deleteUser, updateUser, adminlogin, resetPassword, requestPasswordReset } from "../controllers";

export const router = Router();

// révoquer les jetons
export const tokenRevocationList: string[] = [];


router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/adminlogin', adminlogin);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
