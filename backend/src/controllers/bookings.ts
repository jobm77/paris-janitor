import { Request, Response } from 'express';
import { Booking, Property, User, Service, BookingService } from '../models';
import { validateBooking } from '../validators';
import sequelize from 'sequelize';

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
    console.error('Error in the creation of the booking', error);
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

const getServicesByBookingId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bookingServices = await BookingService.findAll({ where: { bookingId: id } });

    if (bookingServices.length === 0) {
      return res.status(404).json({ message: 'No services found for this booking' });
    }

    const serviceIds = bookingServices.map(bs => bs.serviceId);

    const services = await Service.findAll({ where: { id: serviceIds } });
   
    return res.status(200).json(services);
  } catch(err) {
    console.error('Error retrieving services for booking:', err);
    return res.status(500).json({ message: 'Error while retrieving services for booking'});
  }
};

const addServiceToBooking = async (req: Request, res: Response) => {
  const { bookingId, serviceId } = req.body;

  console.log('Received bookingId:', bookingId);
  console.log('Received serviceId:', serviceId);

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found'});
    }

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found'});
    }
    
    const existingAssociation = await BookingService.findOne({
      where: {
        bookingId,
        serviceId
      }
    });

    if (existingAssociation) {
      return res.status(400).json({ message: 'Service already associated with this booking'});
    }

    await BookingService.create({
      bookingId,
      serviceId
    });
    console.log(bookingId, serviceId);

    return res.status(201).json({ message: 'Service added to booking' });
  } catch(err) {
    console.error('Error adding service to booking', err);
    return res.status(500).json({ message: 'Error while adding service to booking' });
  }
}

const bookService = async (req:Request, res: Response) => {
  const { bookingId } = req.params; 
  const { serviceId } = req.body;

  if (!bookingId || !serviceId) {
    return res.status(400).json({ message: 'Booking ID and Service ID are required' });
  }
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.isBooked) {
      return res.status(400).json({ message: 'Service already booked'});
    }

    service.isBooked = true;
    await service.save();

    await BookingService.create({ bookingId, serviceId });

    return res.status(200).json({ message: 'Service booked successfully' });
  } catch(err) {
    console.error('Error booking service:', err);
    return res.status(500).json({ message: 'Error booking service' });
  }

}

export { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, getServicesByBookingId, addServiceToBooking, bookService };

