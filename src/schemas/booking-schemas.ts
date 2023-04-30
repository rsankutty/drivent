import { Booking } from '@prisma/client';
import Joi from 'joi';

export const bookingSchema = Joi.object<Booking>({
  roomId: Joi.number().required(),
});
