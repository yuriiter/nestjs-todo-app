import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { Request } from "express";
import { TodoListService } from "./todo-list.service";
import { TodoListDto } from "./dto/todo-list.dto";
import { TodoListItemDto } from "../todo-list-item/dto/todo-list-item.dto";
import { validateNumber } from "../common/helpers/validation";

@Controller("todo-lists")
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  // Create a new todolist for user who had the jwt token
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: Request, @Body() todoListDto: TodoListDto) {
    return this.todoListService.create(todoListDto, req.user.id);
  }

  // Delete user's todolist with nested items
  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param("id") todoListId: number, @Req() req) {
    return this.todoListService.delete(validateNumber(todoListId), req.user.id);
  }

  // Create a new todolist item for exact todolist
  @UseGuards(JwtGuard)
  @Post(":todoListId/todo-list-items")
  addNewTodoListItem(
    @Param("todoListId") todoListId: number,
    @Body() todoListItemDto: TodoListItemDto,
    @Req() req,
  ) {
    return this.todoListService.addNewTodoListItem(
      req.user.id,
      validateNumber(todoListId),
      todoListItemDto,
    );
  }

  // Get all todolists with items included, of one user or all existing
  @Get()
  getAll(@Query() query) {
    if (!query["user-id"]) {
      return this.todoListService.getAll();
    }
    const userId = Number(query["user-id"]);
    if (userId) {
      return this.todoListService.getAllByUser(userId);
    }
    throw new BadRequestException("Invalid user id");
  }

  // Get todolist by ID
  @Get(":id")
  getById(@Param("id") todoListId: number) {
    return this.todoListService.getById(validateNumber(todoListId));
  }
}
