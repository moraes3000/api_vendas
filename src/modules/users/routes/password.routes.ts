import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPassword';

const passRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passRouter;
