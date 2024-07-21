-- CreateTable
CREATE TABLE "Apartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "kitchenSquare" INTEGER NOT NULL,
    "bedroomSquare" INTEGER NOT NULL,
    "totalSquare" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "pricePerMeter" INTEGER NOT NULL,
    "priceTotal" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "House" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "kitchenArea" INTEGER NOT NULL,
    "square" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "pricePerMeter" INTEGER NOT NULL,
    "priceTotal" INTEGER NOT NULL
);
