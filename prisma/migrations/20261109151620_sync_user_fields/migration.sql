-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PUBLISHED', 'MODERATION', 'DRAFT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" VARCHAR(50) NOT NULL DEFAULT 'Фестивали',
ADD COLUMN     "participantIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'MODERATION';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "registeredIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
