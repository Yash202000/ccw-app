-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_fkey";

-- DropTable
DROP TABLE "user_profile";

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "avatar" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id" ASC);

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

