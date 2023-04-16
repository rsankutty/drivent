import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTickets(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  try {
    const userTickets = await ticketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    next(error);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const ticketsTypes = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    next(error);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  const { userId } = req as { userId: number };
  try {
    const ticket = await ticketsService.createTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    next(error);
  }
}
