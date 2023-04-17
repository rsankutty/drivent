import { badRequestError, notFoundError, unauthorizedError } from '@/errors';
import { PaymentBody, PaymentData } from '@/protocols';
import paymentRepository from '@/repositories/payments-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function validateTicket(id: number, userId: number) {
  const ticket = await ticketRepository.getTicketById(id);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return ticket;
}

async function getPaymentByTicketId(ticketId: string, userId: number) {
  if (!ticketId) throw badRequestError();
  const id = Number(ticketId);

  await validateTicket(id, userId);

  const payment = await paymentRepository.getPayment(id);
  return payment;
}

type PaymentPayload = PaymentBody & { userId: number };

async function createPayment(payload: PaymentPayload) {
  const ticket = await validateTicket(payload.ticketId, payload.userId);

  const data: PaymentData = {
    ticketId: payload.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: payload.cardData.issuer,
    cardLastDigits: String(payload.cardData.number).slice(-4),
  };

  const payment = await paymentRepository.createPayment(data);
  await ticketRepository.updateTicketStatus(payload.ticketId);
  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentsService;
