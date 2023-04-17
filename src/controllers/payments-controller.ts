import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query as { ticketId: string };
  const { userId } = req as { userId: number };

  try {
    const payment = await paymentsService.getPaymentByTicketId(ticketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const payment = await paymentsService.createPayment({
      ...req.body,
      userId: req.userId,
    });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
