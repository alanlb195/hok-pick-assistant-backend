-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "es_name" TEXT NOT NULL,
    "description" TEXT,
    "extraInfo" TEXT,
    "recommendation" TEXT,
    "image" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "es_name" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "skillId" INTEGER,

    CONSTRAINT "SkillTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillAttribute" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "baseValue" DOUBLE PRECISION,
    "level1" DOUBLE PRECISION,
    "level2" DOUBLE PRECISION,
    "level3" DOUBLE PRECISION,
    "level4" DOUBLE PRECISION,
    "level5" DOUBLE PRECISION,
    "level6" DOUBLE PRECISION,
    "unit" TEXT,

    CONSTRAINT "SkillAttribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTag" ADD CONSTRAINT "SkillTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTag" ADD CONSTRAINT "SkillTag_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAttribute" ADD CONSTRAINT "SkillAttribute_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAttribute" ADD CONSTRAINT "SkillAttribute_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
