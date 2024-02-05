
import express, { Router } from 'express';
import {  CustomerLoginSchema, CustomerRegisterSchema} from '../middleware/requestValidators/auth.validator';
import { validator } from '../middleware/validator';
import {  createCustomerController, customerLoginController,  } from '../controllers/auth.controller';


const router: Router = express.Router();

// Customer routes
router.post('/customer/register', validator(CustomerRegisterSchema), createCustomerController);
router.post('/customer/login', validator(CustomerLoginSchema), customerLoginController);





export default router;