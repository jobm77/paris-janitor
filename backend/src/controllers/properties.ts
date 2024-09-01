import { Request, Response } from 'express';
import { Property, User } from '../models';
import { validateProperty } from '../validators';

const createProperty = async (req: Request, res: Response) => {
  const { error, value } = validateProperty(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Property validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  try {
    const { possessorId, address, announcement, pricePerNight, type, bedrooms, bathrooms, area, amenities, availabilityCalendar, images } = value;

    const possessor = await User.findByPk(possessorId);
    if (!possessor) {
      return res.status(404).json({ message: 'Possessor not found' });
    }

    const newProperty = await Property.create({
      possessorId,
      address,
      announcement,
      pricePerNight,
      type,
      bedrooms,
      bathrooms,
      area,
      amenities,
      availabilityCalendar,
      images
    });
    return res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error in the creation of the property', error);
    return res.status(500).json({ message: 'Error while creating property' });
  }
}

const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.findAll();
    return res.status(200).json(properties);
  } catch (error) {
    console.error('Error while getting all properties', error);
    return res.status(500).json({ message: 'Error while getting all properties' });
  }
}

const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.error('Error while getting property by id', error);
    return res.status(500).json({ message: 'Error while getting property by id' });
  }
}

const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address, announcement, pricePerNight, availabilityCalendar } = req.body;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.address = address ?? property.address;
    property.announcement = announcement ?? property.announcement;
    property.pricePerNight = pricePerNight ?? property.pricePerNight;
    property.availabilityCalendar = availabilityCalendar ?? property.availabilityCalendar;
    await property.save();
    return res.status(200).json(property);
  } catch (error) {
    console.error('Error while updating property', error);
    return res.status(500).json({ message: 'Error while updating property' });
  }
}

const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error while deleting property', error);
    return res.status(500).json({ message: 'Error while deleting property' });
  }
}

const addUnavailableDates = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { unavailableDates } = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.availabilityCalendar = [
      ...(property.availabilityCalendar || ''),
      ...unavailableDates
    ].join(',');

    await property.save();
    return res.status(200).json(property);
  } catch (error) {
    console.error('Error while adding unavailable dates', error);
    return res.status(500).json({ message: 'Error while adding unavailable dates' });
  }
}

const removeUnavailableDates = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { unavailableDates } = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.availabilityCalendar = ((property.availabilityCalendar ?? '') as string) + ',' + unavailableDates.join(',');
    
    await property.save();
    return res.status(200).json(property);
  } catch (error) {
    console.error('Error while removing unavailable dates', error);
    return res.status(500).json({ message: 'Error while removing unavailable dates' });
  }
}

const getAvailabilityCalendar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    return res.status(200).json(property.availabilityCalendar);
  } catch (error) {
    console.error('Error while getting availability calendar', error);
    return res.status(500).json({ message: 'Error while getting availability calendar' });
  }
}


export { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty, addUnavailableDates, removeUnavailableDates, getAvailabilityCalendar};