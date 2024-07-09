import { PrismaClient, Prisma } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const DATA_COUNT = 100;
const dataMock = [];

const pgts = [
  'Антополь',
  'Бегомль',
  'Бешенковичи',
  'Бобр',
  'Богушевск',
  'Болбасово',
  'Большая',
  'Берестовица',
  'Боровуха',
  'Брагин',
  'Ветрино',
  'Видзы',
  'Вороново',
  'Воропаево',
  'Глуск',
  'Городея',
  'Городище',
  'Домачево',
  'Дрибин',
  'Езерище',
  'Желудок',
  'Заречье',
  'Зельва',
  'Козловщина',
  'Комарин',
  'Копысь',
  'Кореличи',
  'Корма',
  'Коханово',
  'Краснополье',
  'Кривичи',
  'Лельчицы',
  'Лиозно',
  'Логишин',
  'Лоев',
  'Лынтупы',
  'Любча',
  'Мачулищи',
  'Мир',
  'Новоельня',
  'Оболь',
  'Озаричи',
  'Октябрьский',
  'Ореховск',
  'Освея',
  'Острино',
  'Паричи',
  'Плещеницы',
  'Подсвилье',
  'Порозово',
  'Радошковичи',
  'Радунь',
  'Россоны',
  'Россь',
  'Руба',
  'Руденск',
  'Свирь',
  'Свислочь',
  'Смиловичи',
  'Сопоцкин',
  'Старобин',
  'Стрешин',
  'Сураж',
  'Телеханы',
  'Тереховка',
  'Уречье',
  'Ушачи',
  'Холопеничи',
  'Хотимск',
  'Шарковщина',
  'Шерешёво',
  'Юратишки',
  'Яновичи',
];

const cityes = [
  'Микашевичи',
  'Гродно',
  'Минск',
  'Фаниполь',
  'Миоры',
  'Давид',
  'Городок',
  'Могилёв',
  'Хойники',
  'Дзержинск',
  'Мозырь',
  'Дисна',
  'Молодечно',
  'Чаусы',
  'Добруш',
  'Мосты',
  'Чашники',
  'Докшицы',
  'Мстиславль',
  'Червень',
  'Дрогичин',
  'Мядель',
  'Чериков',
  'Дубровно',
  'Чечерск',
  'Дятлово',
  'Наровля',
  'Несвиж',
  'Шклов',
  'Ельск',
  'Новогрудок',
  'Новолукомль',
  'Щучин',
  'Жабинка',
  'Новополоцк',
  'Житковичи',
  'Жлобин',
  'Орша',
  'Жодино',
  'Осиповичи',
  'Островец',
  'Заславль',
  'Ошмяны',
];

for (let i = 0; i < DATA_COUNT; i++) {
  const typeApartment = faker.helpers.arrayElement(['ONE_ROOM', 'TWO_ROOM']);
  const typeHouse = faker.helpers.arrayElement(['RESIDENTIAL', 'GARDEN']);
  const floorMax = faker.number.int({ min: 3, max: 20 });
  const floor = `faker.number.int({ min: 1, max: floorMax })/${floorMax}`;
  const kitchenSquare = faker.number.int({ min: 6, max: 14 });
  const bedroomSquare = faker.number.int({ min: 8, max: 34 });
  const square = faker.number.int({ min: 3, max: 20 });
  const address = `${faker.helpers.arrayElement(cityes)}, ул. ${faker.location.street()}, ${faker.number.int(100)}`;
  const addressHouse = `пгт. ${faker.helpers.arrayElement(pgts)}, ул. ${faker.location.street()}, ${faker.number.int(100)}`;
  const pricePerMeter = faker.number.int({ min: 700, max: 1000 });

  const apartment: Prisma.ApartmentCreateInput = {
    type: typeApartment,
    floor,
    kitchenSquare,
    bedroomSquare,
    address,
    pricePerMeter,
  };

  const house: Prisma.HouseCreateInput = {
    type: typeHouse,
    kitchenArea: kitchenSquare + 6,
    square,
    address: addressHouse,
    pricePerMeter,
  };

  const fullData = {
    apartment,
    house,
  };

  dataMock.push(fullData);
}

async function main() {
  console.log(`Start seeding ...`);
  for (const item of dataMock) {
    await prisma.apartment.create({
      data: item.apartment,
    });
    await prisma.house.create({
      data: item.house,
    });
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
