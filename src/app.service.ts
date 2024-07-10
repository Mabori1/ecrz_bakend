import { Injectable } from '@nestjs/common';
import { Prisma, Apartment, House } from '@prisma/client';
import { PrismaService } from './prisma.service';

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

  async apartmentsFiltered(params: {
    skip?: number;
    take?: number;
    type?: string;
    cursor?: Prisma.ApartmentWhereUniqueInput;
    where?: Prisma.ApartmentWhereInput;
    orderBy?: Prisma.ApartmentOrderByWithRelationInput;
  }): Promise<Apartment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.apartment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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

  async housesFiltered(params: {
    skip?: number;
    take?: number;
    type?: string;
    cursor?: Prisma.HouseWhereUniqueInput;
    where?: Prisma.HouseWhereInput;
    orderBy?: Prisma.HouseOrderByWithRelationInput;
  }): Promise<House[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.house.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
