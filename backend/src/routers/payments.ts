import express, { Router } from "express";
import { createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment, processPayment, handleWebhook, createCheckoutSession } from "../controllers";
export const router = Router();


router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.post('/processPayment', processPayment);

router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);
router.post('/create-checkout-session', createCheckoutSession);