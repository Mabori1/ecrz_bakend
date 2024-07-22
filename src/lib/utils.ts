import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { housesTypes, HousesTypes, roomsTypes, RoomsTypes } from './types';
import { Prisma } from '@prisma/client';

export class QueryParams {
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

  @IsIn(['priceTotal', 'totalSquare', 'square', ''])
  @IsOptional()
  public sortBy: 'priceTotal' | 'totalSquare' | 'square' | '';

  @IsEnum(RoomsTypes, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item.toLowerCase()))
  @IsOptional()
  public rooms: RoomsTypes[];

  @IsEnum(HousesTypes, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item.toLowerCase()))
  @IsOptional()
  public types: HousesTypes[];

  cursor?: Prisma.ApartmentWhereUniqueInput;
  where?: Prisma.ApartmentWhereInput;
  orderBy?: Prisma.ApartmentOrderByWithRelationInput;
}

export const replaceApartments = (arrApartments: string[]) => {
  if (arrApartments.length === 0) return [];
  const tempRooms = [];

  for (const room of arrApartments) {
    roomsTypes.forEach((item) => (item.type === room ? tempRooms.push(item.value) : null));
  }
  return tempRooms;
};

export const replaceHouses = (arrHouses: string[]) => {
  if (arrHouses.length === 0) return [];
  const tempHouses = [];

  for (const house of arrHouses) {
    housesTypes.forEach((item) => (item.type === house ? tempHouses.push(item.value) : null));
  }
  return tempHouses;
};
