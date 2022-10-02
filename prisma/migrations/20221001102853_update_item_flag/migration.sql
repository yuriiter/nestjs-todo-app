/*
  Warnings:

  - You are about to drop the `TodoList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoListItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TodoListToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoListItem" DROP CONSTRAINT "TodoListItem_todoListId_fkey";

-- DropForeignKey
ALTER TABLE "_TodoListToUser" DROP CONSTRAINT "_TodoListToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TodoListToUser" DROP CONSTRAINT "_TodoListToUser_B_fkey";

-- DropTable
DROP TABLE "TodoList";

-- DropTable
DROP TABLE "TodoListItem";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_TodoListToUser";

-- DropEnum
DROP TYPE "Flag";
