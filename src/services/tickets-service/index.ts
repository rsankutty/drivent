import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function getTickets(userId: number) {
  const ticket = await ticketRepository.getTickets(userId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketsTypes() {
  return ticketRepository.getTicketsTypes();
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.createTicket(enrollment.id, ticketTypeId);

  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTickets,
  getTicketsTypes,
  createTicket,
};

export default ticketsService;
