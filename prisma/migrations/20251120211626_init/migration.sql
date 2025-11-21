-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "mainJob" TEXT,
    "recommendRoad" TEXT,
    "image" TEXT,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroCounter" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "counterId" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "HeroCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSynergy" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "synergyId" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "HeroSynergy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HeroCounter" ADD CONSTRAINT "HeroCounter_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroCounter" ADD CONSTRAINT "HeroCounter_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroSynergy" ADD CONSTRAINT "HeroSynergy_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroSynergy" ADD CONSTRAINT "HeroSynergy_synergyId_fkey" FOREIGN KEY ("synergyId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
