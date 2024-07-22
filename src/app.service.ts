import { Injectable } from '@nestjs/common';
import { Prisma, Apartment, House } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { replaceApartments, replaceHouses } from './lib/utils';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async apartment(id: Prisma.ApartmentWhereUniqueInput): Promise<Apartment | null> {
    return this.prisma.apartment.findUnique({
      where: id,
    });
  }

  async apartments() {
    return this.prisma.apartment.findMany();
  }

  async apartmentsFiltered({
    take,
    skip,
    priceMin,
    priceMax,
    squareMin,
    squareMax,
    rooms,
    sortBy,
    sortDirection,
  }): Promise<Apartment[]> {
    const roomsArray = rooms ? replaceApartments(rooms) : [];
    const roomsCondition = roomsArray.length > 0 ? { type: { in: roomsArray } } : {};

    const and = {
      AND: [
        { priceTotal: { gte: priceMin, lte: priceMax } },
        { totalSquare: { gte: squareMin, lte: squareMax } },
        roomsCondition,
      ].filter((condition) => Object.keys(condition).length > 0),
    };
    const orderByValue =
      (sortBy && sortBy === 'totalSquare') || sortBy === 'priceTotal'
        ? { [sortBy]: sortDirection }
        : undefined;

    return this.prisma.apartment.findMany({
      where: {
        ...and,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderByValue,
    });
  }

  async house(id: Prisma.HouseWhereUniqueInput): Promise<House | null> {
    return this.prisma.house.findUnique({
      where: id,
    });
  }

  async houses() {
    return this.prisma.house.findMany();
  }

  async housesFiltered({
    take,
    skip,
    priceMin,
    priceMax,
    squareMin,
    squareMax,
    types,
    sortBy,
    sortDirection,
  }): Promise<House[]> {
    const housesArray = types ? replaceHouses(types) : [];
    const roomsCondition = housesArray.length > 0 ? { type: { in: housesArray } } : {};

    const and = {
      AND: [
        { priceTotal: { gte: priceMin, lte: priceMax } },
        { square: { gte: squareMin, lte: squareMax } },
        roomsCondition,
      ].filter((condition) => Object.keys(condition).length > 0),
    };
    const orderByValue =
      (sortBy && sortBy === 'square') || sortBy === 'priceTotal'
        ? { [sortBy]: sortDirection }
        : undefined;

    return this.prisma.house.findMany({
      where: {
        ...and,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderByValue,
    });
  }
}
