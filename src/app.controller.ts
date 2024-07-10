import { Controller, Get, Param, Query } from '@nestjs/common';
import { Apartment as ApartmentModel, House as HouseModel } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // apartments/filters?searchString={searchString}&take={take}&skip={skip}&sort={sort}&orderBy={orderBy}
  @Get('apartments/filters')
  async getFilteredApartments(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: 'ONE_ROOM' | 'TWO_ROOM',
    @Query('sort') sort: 'pricePerMeter' | 'totalSquare' = 'pricePerMeter',
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ): Promise<ApartmentModel[]> {
    const or = searchString
      ? {
          OR: [{ type: { contains: searchString } }],
        }
      : {};
    const orderByMap = sort
      ? {
          [`${sort}`]: orderBy,
        }
      : {};

    return this.appService.apartmentsFiltered({
      where: {
        ...or,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderByMap,
    });
  }

  @Get('apartments')
  async getApartments(): Promise<ApartmentModel[]> {
    return this.appService.apartments();
  }

  @Get('apartments/:id')
  async getApartmentById(@Param('id') id: string): Promise<ApartmentModel> {
    return this.appService.apartment({ id: Number(id) });
  }

  @Get('houses/filters')
  async getFilteredHouses(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: 'RESIDENTIAL' | 'GARDEN',
    @Query('sort') sort: 'pricePerMeter' | 'square' = 'pricePerMeter',
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ): Promise<HouseModel[]> {
    const or = searchString
      ? {
          OR: [{ type: { contains: searchString } }],
        }
      : {};
    const orderByMap = sort
      ? {
          [`${sort}`]: orderBy,
        }
      : {};

    return this.appService.housesFiltered({
      where: {
        ...or,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderByMap,
    });
  }

  @Get('houses')
  async getHouses(): Promise<HouseModel[]> {
    return this.appService.houses();
  }

  @Get('houses/:id')
  async getHouseById(@Param('id') id: string): Promise<HouseModel> {
    return this.appService.house({ id: Number(id) });
  }
}
