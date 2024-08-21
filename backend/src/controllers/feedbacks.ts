import { Request, Response } from "express";
import { Feedback, Property, User } from "../models";
import { validateFeedback } from "../validators";

const createFeedback = async (req: Request, res: Response) => {
  const { error, value } = validateFeedback(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Feedback validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  try {
    const { userId, propertyId, rating, comment } = value;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newFeedback = await Feedback.create({ userId, propertyId, rating, comment });
    return res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error in the creation of the feedback', error);
    return res.status(500).json({ message: 'Error while creating feedback' });
  }
}

const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.findAll();
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error while getting all feedbacks', error);
    return res.status(500).json({ message: 'Error while getting all feedbacks' });
  }
}

const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    return res.status(200).json(feedback);
  } catch (error) {
    console.error('Error while getting feedback by id', error);
    return res.status(500).json({ message: 'Error while getting feedback by id' });
  }
}

const updateFeedback = async (req: Request, res: Response) => {
  const { error, value } = validateFeedback(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Feedback validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = value;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    feedback.userId = userId;
    feedback.propertyId = propertyId;
    feedback.rating = rating;
    feedback.comment = comment;
    await feedback.save();

    return res.status(200).json(feedback);
  } catch (error) {
    console.error('Error while updating feedback', error);
    return res.status(500).json({ message: 'Error while updating feedback' });
  }
}

const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await feedback.destroy();
    return res.status(204).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error while deleting feedback', error);
    return res.status(500).json({ message: 'Error while deleting feedback' });
  }
}

export {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};