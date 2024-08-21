import { Request, Response } from 'express';
import { Booking, Property, User } from '../models';
import { validateBooking } from '../validators';

const createBooking = async (req: Request, res: Response) => {
    const { error, value } = validateBooking(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Booking validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
  
    try {
    const { userId, propertyId, startDate, endDate, status } = value;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newBooking = await Booking.create({ userId, propertyId, startDate, endDate, status });
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error in the cration of the booking', error);
    return res.status(500).json({ message: 'Error while creating booking' });
  }
}

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error while getting all bookings', error);
    return res.status(500).json({ message: 'Error while getting all bookings' });
  }
}

const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.error('Error while getting booking by id', error);
    return res.status(500).json({ message: 'Error while getting booking by id' });
  }
}

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  const { startDate, endDate, status } = req.body;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.startDate = startDate ?? booking.startDate;
    booking.endDate = endDate ?? booking.endDate;
    booking.status = status ?? booking.status;

    await booking.save();
    return res.status(200).json(booking);
  } catch (error) {
    console.error('Error while updating booking', error);
    return res.status(500).json({ message: 'Error while updating booking' });
  }
}

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await booking.destroy();
    return res.status(204).json({ message: 'Booking deleted' });
    } catch (error) {
        console.error('Error while deleting booking', error);
        return res.status(500).json({ message: 'Error while deleting booking' });
    }
}

export { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };

