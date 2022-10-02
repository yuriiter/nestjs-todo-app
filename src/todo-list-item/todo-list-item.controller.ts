import { Body, Controller, Param, Put, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { TodoListItemService } from "./todo-list-item.service";
import { Flag } from "@prisma/client";
import { validateNumber } from "../common/helpers/validation";

@UseGuards(JwtGuard)
@Controller("todo-list-items")
export class TodoListItemController {
  constructor(private todoListItemService: TodoListItemService) {}

  // Change todolist item status
  @Put(":id")
  changeStatus(@Param("id") id, @Body() status: { flag: Flag }, @Req() req) {
    return this.todoListItemService.changeStatus(
      req.user.id,
      validateNumber(id),
      status.flag,
    );
  }
}
