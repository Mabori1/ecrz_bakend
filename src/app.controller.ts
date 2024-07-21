import { Controller, Get, Logger, NotFoundException, Param, Query } from '@nestjs/common';
import { Apartment as ApartmentModel, House as HouseModel } from '@prisma/client';
import { AppService } from './app.service';
import { QueryApartments } from './lib/utils';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  // apartments/filters?searchString={searchString}&take={take}&skip={skip}&sort={sort}&orderBy={orderBy}
  @Get('apartments/filters')
  async getFilteredApartments(@Query() query: QueryApartments): Promise<ApartmentModel[]> {
    const apartments = await this.appService.apartmentsFiltered(query).catch((err) => {
      this.logger.error(err);
      throw new NotFoundException('Apartments not found');
    });

    if (!apartments) {
      throw new NotFoundException('Apartments not found');
    }

    return apartments;
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
