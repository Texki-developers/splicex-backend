
import express, { Router } from 'express';
import { AdminLoginScheme, AdminRegisterSchema, CustomerForgetPasswordSchema, CustomerLoginSchema, CustomerRegisterSchema, CustomerResetPasswordSchema } from '../middleware/requestValidators/auth.validator';
import { validator } from '../middleware/validator';
import { adminLoginController, adminLogoutController, adminSignupController, createCustomerController, customerForgetPasswordController, customerLoginController, customerResetPasswordController } from '../controllers/auth.controller';
import { validateJwtToken } from '../middleware/jwtValidator';
import { roleValidator } from '../middleware/roleValidator';

const router: Router = express.Router();

// Customer routes
router.post('/customer/register', validator(CustomerRegisterSchema), createCustomerController);
router.post('/customer/login', validator(CustomerLoginSchema), customerLoginController);
router.post('/customer/forget-password', validator(CustomerForgetPasswordSchema), customerForgetPasswordController);
router.post('/customer/reset-password', validator(CustomerResetPasswordSchema), customerResetPasswordController)

// Admin routes
router.post('/admin/register', validator(AdminRegisterSchema), validateJwtToken, roleValidator(['SA']), adminSignupController)
router.post('/admin/login', validator(AdminLoginScheme), adminLoginController)
router.post('/admin/logout', validateJwtToken, adminLogoutController)


export default router;