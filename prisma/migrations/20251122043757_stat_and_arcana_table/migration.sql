-- CreateEnum
CREATE TYPE "ArcanaColor" AS ENUM ('Red', 'Green', 'Blue');

-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "es_name" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arcana" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" "ArcanaColor" NOT NULL,

    CONSTRAINT "Arcana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcanaStat" (
    "id" SERIAL NOT NULL,
    "arcanaId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ArcanaStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stat_code_key" ON "Stat"("code");

-- AddForeignKey
ALTER TABLE "ArcanaStat" ADD CONSTRAINT "ArcanaStat_arcanaId_fkey" FOREIGN KEY ("arcanaId") REFERENCES "Arcana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcanaStat" ADD CONSTRAINT "ArcanaStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
