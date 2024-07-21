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

  @IsIn(['priceTotal', 'totalSquare', ''])
  @IsOptional()
  public sortBy: 'priceTotal' | 'totalSquare' | '';

  @IsEnum(RoomsTypes, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item.toLowerCase()))
  @IsOptional()
  public rooms: RoomsTypes[];

  cursor?: Prisma.ApartmentWhereUniqueInput;
  where?: Prisma.ApartmentWhereInput;
  orderBy?: Prisma.ApartmentOrderByWithRelationInput;
}

export const replaceRooms = (rooms: string[]) => {
  if (rooms.length === 0) return [];
  const tempRooms = [];

  for (const room of rooms) {
    roomsTypes.forEach((item) => (item.type === room ? tempRooms.push(item.value) : null));
  }
  return tempRooms;
};
