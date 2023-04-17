import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(data: PaymentData) {
  return prisma.payment.create({ data });
}

const paymentRepository = { getPayment, createPayment };

export default paymentRepository;
