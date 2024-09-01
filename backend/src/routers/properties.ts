import { Router } from "express";
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty, addUnavailableDates, removeUnavailableDates, getAvailabilityCalendar } from "../controllers";
export const router = Router();


router.post('/', createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.post('/:id/unavailable-dates', addUnavailableDates);
router.delete('/:id/unavailable-dates', removeUnavailableDates);
router.get('/:id/availability-calendar', getAvailabilityCalendar);

