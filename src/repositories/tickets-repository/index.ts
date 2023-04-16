import { prisma } from '@/config';

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: { Enrollment: { User: { id: userId } } },
    include: { TicketType: true },
  });
}

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

async function findOneByTicketId(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    select: {
      TicketType: { select: { price: true } },
      Enrollment: { select: { userId: true } },
    },
  });
}

const ticketRepository = {
  getTickets,
  getTicketsTypes,
  createTicket,
  findOneByTicketId,
};

export default ticketRepository;
