/*
  Warnings:

  - Made the column `todoListId` on table `TodoListItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TodoListItem" DROP CONSTRAINT "TodoListItem_todoListId_fkey";

-- AlterTable
ALTER TABLE "TodoListItem" ALTER COLUMN "todoListId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoListItem" ADD CONSTRAINT "TodoListItem_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
