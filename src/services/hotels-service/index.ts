import { Hotel } from '@prisma/client';
import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function getHotelWithRooms(hotelId: number, userId: number) {
  const hotelRooms = await hotelRepository.findHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelsService = { getHotels, getHotelWithRooms };

export default hotelsService;
