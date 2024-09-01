import express, { Router } from "express";
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, getServicesByBookingId, addServiceToBooking, bookService } from "../controllers";
export const router = Router();


router.post('/', createBooking);
router.post('/:bookingId/services', bookService);
router.post('/:bookingId/add-service', addServiceToBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.get('/:id/services', getServicesByBookingId);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

