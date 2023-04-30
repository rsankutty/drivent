import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findRoomWithBooking(id: number) {
  return prisma.room.findUnique({
    where: { id },
    include: { Booking: true },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: { userId, roomId },
  });
}

async function findBookingById(id: number) {
  return prisma.booking.findUnique({
    where: { id },
  });
}

async function updateBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: { id },
    data: { roomId },
    select: { id: true },
  });
}

const bookingRepository = {
  findBooking,
  createBooking,
  findRoomWithBooking,
  updateBooking,
  findBookingById,
};

export default bookingRepository;
