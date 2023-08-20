-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_author_id_fkey";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "post";

