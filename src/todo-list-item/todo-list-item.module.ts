import { Module } from "@nestjs/common";
import { TodoListItemService } from "./todo-list-item.service";
import { TodoListItemController } from "./todo-list-item.controller";

@Module({
  providers: [TodoListItemService],
  controllers: [TodoListItemController],
})
export class TodoListItemModule {}
