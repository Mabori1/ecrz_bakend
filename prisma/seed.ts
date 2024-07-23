import { PrismaClient, Prisma } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const DATA_COUNT = 900;
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
  const typeApartment = faker.helpers.arrayElement([
    'ONE_ROOM',
    'TWO_ROOM',
    'TREE_ROOM',
    'FOUR_ROOM',
    'STUDIYA',
  ]);
  const typeHouse = faker.helpers.arrayElement(['RESIDENTIAL', 'GARDEN', 'PARTHOUSE', 'TANHOUSE']);
  const typeBuildingApartaments = faker.helpers.arrayElement([
    'Квартира в новостройке',
    'Вторичное жильё',
  ]);
  const typeBuildingHouse = typeHouse === 'GARDEN' ? 'Земля сельхозназначения' : 'ИЖС';
  const floorMax = faker.number.int({ min: 3, max: 20 });
  const floor = `${faker.number.int({ min: 1, max: floorMax })}/${floorMax}`;
  let kitchenSquare = faker.number.int({ min: 6, max: 14 });
  const bedroomSquare = faker.number.int({ min: 15, max: 24 });
  const squareHouse = faker.number.int({ min: 6, max: 25 });
  const squareGarden = faker.number.int({ min: 3, max: 10 });
  const address = `${faker.helpers.arrayElement(cityes)}, ул. ${faker.location.street()}, ${faker.number.int(100)}`;
  const addressHouse = `пгт. ${faker.helpers.arrayElement(pgts)}, ул. ${faker.location.street()}, ${faker.number.int(100)}`;
  let pricePerMeter = faker.number.int({ min: 700, max: 1200 });
  let totalSquare = 0;
  let name = '';
  switch (typeApartment) {
    case 'ONE_ROOM':
      totalSquare = kitchenSquare + bedroomSquare + 7;
      name = `1-к. квартира, ${totalSquare}`;
      break;
    case 'TWO_ROOM':
      totalSquare = kitchenSquare + bedroomSquare + 28;
      name = `2-к. квартира, ${totalSquare}`;
      break;
    case 'TREE_ROOM':
      totalSquare = kitchenSquare + bedroomSquare + 48;
      name = `3-к. квартира, ${totalSquare}`;
      break;
    case 'FOUR_ROOM':
      totalSquare = kitchenSquare + bedroomSquare + 70;
      name = `4-к. квартира, ${totalSquare}`;
      break;
    case 'STUDIYA':
      totalSquare = bedroomSquare + 9;
      name = `Студия, ${totalSquare}`;
      kitchenSquare = 0;
      break;

    default:
      break;
  }

  let nameHouse = '';
  let square = 0;
  let squareBuilding = 0;

  switch (typeHouse) {
    case 'RESIDENTIAL':
      square = squareHouse;
      squareBuilding = totalSquare + 100;
      nameHouse = `Дом, ${squareHouse / 100} га, ${squareBuilding}`;
      break;
    case 'GARDEN':
      square = squareGarden;
      squareBuilding = totalSquare + 10;
      pricePerMeter = pricePerMeter / 2;
      nameHouse = `Дача, ${squareGarden / 100} га, ${squareBuilding}`;
      break;
    case 'TANHOUSE':
      square = squareGarden;
      squareBuilding = totalSquare + 100;
      nameHouse = `Танхаус, ${squareGarden / 100} га, ${squareBuilding}`;
      break;
    case 'PARTHOUSE':
      square = squareGarden;
      squareBuilding = totalSquare + 50;
      nameHouse = `Часть дома, ${squareGarden / 100} га, ${squareBuilding}`;
      break;

    default:
      break;
  }

  const apartment: Prisma.ApartmentCreateInput = {
    type: typeApartment,
    name,
    typeBuilding: typeBuildingApartaments,
    floor,
    kitchenSquare,
    bedroomSquare,
    totalSquare,
    address,
    pricePerMeter,
    priceTotal: pricePerMeter * totalSquare,
  };

  const house: Prisma.HouseCreateInput = {
    type: typeHouse,
    name: nameHouse,
    typeBuilding: typeBuildingHouse,
    kitchenSquare: kitchenSquare + 6,
    totalSquare: square,
    address: addressHouse,
    squareBuilding,
    pricePerMeter,
    priceTotal: pricePerMeter * squareBuilding,
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
