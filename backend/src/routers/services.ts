import { Router } from 'express';
import { createService, getAllServices } from '../controllers/services';

export const router = Router();

router.get('/', getAllServices);
router.post('/', createService);

