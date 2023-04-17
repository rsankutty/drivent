import { Router } from 'express';
import { getPayment, postPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentBody } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPayment)
  .post('/process', validateBody(paymentBody), postPayment);

export { paymentsRouter };
