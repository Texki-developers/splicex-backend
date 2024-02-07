
import express, { Router } from 'express';
import {  CustomerLoginSchema, CustomerRegisterSchema} from '../middleware/requestValidators/auth.validator';
import { validator } from '../middleware/validator';
import { createUserController, userLoginController,  } from '../controllers/auth.controller';


const router: Router = express.Router();

// Customer routes
router.post('/admin/register', validator(CustomerRegisterSchema), createUserController);
router.post('/admin/login', validator(CustomerLoginSchema), userLoginController);

export default router;