import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelWithRooms(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const hotelRooms = await hotelsService.getHotelWithRooms(Number(userId), Number(hotelId));
    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (e) {
    next(e);
  }
}
