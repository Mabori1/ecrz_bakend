export class Query {
  public take?: number;
  public skip?: number;
  public sotrDirection?: 'desc' | 'asc' = 'desc';
  public sotr?: 'price' | 'square';
  public priceFrom?: number;
  public priceTo?: number;
  public squareFrom?: number;
  public squareTo?: number;
  public room?: number;
}

export enum RoomsTypes {
  STUDIYA = 'Студия',
  ONE_ROOM = '1',
  TWO_ROOM = '2',
  THREE_ROOM = '3',
  FOUR_ROOM = '4+',
}

export const roomsTypes = [
  { value: 'STUDIYA', type: 'Студия' },
  { value: 'ONE_ROOM', type: '1' },
  { value: 'TWO_ROOM', type: '2' },
  { value: 'THREE_ROOM', type: '3' },
  { value: 'FOUR_ROOM', type: '4+' },
];

// skip?: number;
// take?: number;
// priceMin?: number;
// priceMax?: number;
// squareMin?: number;
// squareMax?: number;
// rooms?: string;
// sortBy?: string;
// sortDirection?: string;
// cursor?: Prisma.ApartmentWhereUniqueInput;
// where?: Prisma.ApartmentWhereInput;
// orderBy?: Prisma.ApartmentOrderByWithRelationInput;
