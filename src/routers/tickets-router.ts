import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, getTickets, createTicket } from '@/controllers/tickets-controller';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .get('/', getTickets)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
