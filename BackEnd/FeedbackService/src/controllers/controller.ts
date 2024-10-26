import { Request, Response } from 'express';
import { Feedback } from '../models/model';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json({err});
  }
};

// Get all feedback
export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Get feedback by ID
export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findOne({ _id: req.params.id });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Update feedback
export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete feedback
export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const deletedFeedback = await Feedback.findOneAndDelete({ _id: req.params.id });
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error });
  }
};