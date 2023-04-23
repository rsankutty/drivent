import { Hotel } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function validateHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();

  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();
}

async function getHotels(userId: number): Promise<Hotel[]> {
  await validateHotels(userId);

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function getHotelWithRooms(userId: number, hotelId: number) {
  await validateHotels(userId);

  const hotelRooms = await hotelRepository.findHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelsService = { getHotels, getHotelWithRooms };

export default hotelsService;
