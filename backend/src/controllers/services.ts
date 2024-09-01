import { Request, Response } from 'express';
import { validateService }  from '../validators';
import { Booking, Service, BookingService } from '../models';

const createService = async (req: Request, res: Response) => {
  const { error, value } = validateService(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Service validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  try {
    const { name, description, price, category, isBooked } = value;
    const newService = await Service.create({ name, description, price, category, isBooked });
    return res.status(201).json(newService);
  } catch(err) {
    console.error('Error creating service', err);
    return res.status(500).json({ message: 'Error while creating service' });  
  }
};

const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch(err) {
    console.error("Error fetching services: ", err);
    res.status(404).json({ message: "Error fetching services" });
  }
}



export {
  createService,
  getAllServices
}