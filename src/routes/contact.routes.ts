import express, { Router } from 'express';
import { createContactController, getContactController } from '../controllers/contact.controller';
import { validateJwtToken } from '../middleware/jwtValidator';
import { roleValidator } from '../middleware/roleValidator';

const router: Router = express.Router();

router.post('/', createContactController)
router.get('/', validateJwtToken, roleValidator(['SA','A']), getContactController)

export default router;