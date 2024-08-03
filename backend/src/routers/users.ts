/**
 * Routes pour répertorier les membres de l'association.
 */

import express, { Router, Request, Response } from "express";
import { authenticateToken } from "../middlewares";
//import { register } from "../controllers";

export const router = Router();

// révoquer les jetons
export const tokenRevocationList: string[] = [];

//router.post('/register', register);