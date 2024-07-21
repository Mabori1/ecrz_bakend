import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { roomsTypes, RoomsTypes } from './types';
import { Prisma } from '@prisma/client';

export class QueryApartments {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public take: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public skip: number;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMin: number;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMax: number;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public squareMin: number;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public squareMax: number;

  @IsIn(['asc', 'desc', ''])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' | '' = 'desc';

  @IsIn(['price', 'square', ''])
  @IsOptional()
  public sortBy: 'price' | 'square' | '' = 'price';
  @IsEnum(RoomsTypes, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public rooms: RoomsTypes[];

  cursor?: Prisma.ApartmentWhereUniqueInput;
  where?: Prisma.ApartmentWhereInput;
  orderBy?: Prisma.ApartmentOrderByWithRelationInput;
}

export const replaceRooms = (rooms: string[]) => {
  const tempRooms = [];

  for (const room of rooms) {
    roomsTypes.forEach((item) => (item.type === room ? tempRooms.push(item.value) : null));
  }
  return tempRooms;
};

// export const createQueryString = (queryArgs?: QueryApartments) => {
//   if (!queryArgs) {
//     return '';
//   }
//
//   const queryParams = [
//     `${queryArgs.take ? `take=${queryArgs.take}` : ''}`,
//     `${queryArgs.skip ? `skip=${queryArgs.skip}` : ''}`,
//     `${queryArgs.priceMin ? `priceMin=${queryArgs.priceMin}` : ''}`,
//     `${queryArgs.priceMax ? `priceMax=${queryArgs.priceMax}` : ''}`,
//     `${queryArgs.squareMin ? `squareMin=${queryArgs.squareMin}` : ''}`,
//     `${queryArgs.squareMax ? `squareMax=${queryArgs.squareMax}` : ''}`,
//     `${queryArgs.sortBy ? `sortBy=${queryArgs.sortBy}` : ''}`,
//     `${queryArgs.sortDirection ? `sortDirection=${queryArgs.sortDirection}` : ''}`,
//     `${queryArgs.rooms ? `rooms=${queryArgs.rooms}` : ''}`,
//   ];
//
//   const isNotEmptyString = queryParams.filter((param) => param !== '').join('') !== '';
//
//   const queryString = isNotEmptyString
//     ? `?${queryParams.filter((param) => param !== '').join('&')}`
//     : '';
//
//   return queryString;
// };
