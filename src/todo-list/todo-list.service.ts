import { BadRequestException, Injectable } from "@nestjs/common";
import { TodoListDto } from "./dto/todo-list.dto";
import { PrismaService } from "../prisma/prisma.service";
import { TodoList } from "@prisma/client";
import { NotFoundError } from "rxjs";
import { TodoListItemDto } from "../todo-list-item/dto/todo-list-item.dto";

@Injectable()
export class TodoListService {
  constructor(private prismaService: PrismaService) {}

  async create(todoList: TodoListDto, userId: number) {
    const findUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    const newTodoList = await this.prismaService.todoList.create({
      data: {
        name: todoList.name,
        owners: {
          connect: {
            id: findUser.id,
          },
        },
      },
    });
  }

  async getAllByUser(userId: number) {
    const todoLists = await this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .todoLists({
        include: {
          todoListItems: true,
        },
      });
    return todoLists;
  }

  async getById(todoListId: number) {
    const todoList = await this.prismaService.todoList.findUnique({
      where: {
        id: todoListId,
      },
      include: {
        todoListItems: true,
      },
    });
    return todoList;
  }

  async addUser(todoListId: number, userId: number) {
    const todoList = await this.prismaService.todoList.update({
      where: {
        id: todoListId,
      },
      data: {
        owners: {
          connect: [
            {
              id: userId,
            },
          ],
        },
      },
    });

    return todoList;
  }

  async delete(todoListId: number, userId: number) {
    try {
      const todoList = await this.prismaService.user
        .findUnique({
          where: {
            id: userId,
          },
          select: {
            todoLists: true,
          },
        })
        .todoLists({
          where: {
            id: todoListId,
          },
        });

      await this.prismaService.todoListItem.deleteMany({
        where: {
          todoListId: todoListId,
        },
      });
      await this.prismaService.todoList.delete({
        where: {
          id: todoListId,
        },
      });
      return todoList;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestException("Invalid todo list");
      }
    }
  }

  async addNewTodoListItem(
    userId: number,
    todoListId: number,
    todoListItemDto: TodoListItemDto,
  ) {
    try {
      const todoList = await this.prismaService.todoList.findUnique({
        where: {
          id: todoListId,
        },
        include: {
          owners: true,
        },
      });
      if (!todoList.owners.find((user) => user.id === userId)) {
        throw new BadRequestException("Invalid user");
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestException("Invalid todo list");
      }
    }
    const todoListItem = await this.prismaService.todoListItem.create({
      data: {
        title: todoListItemDto.title,
        freeText: todoListItemDto.freeText,
        deadline: todoListItemDto.deadLine,
        todoList: {
          connect: {
            id: todoListId,
          },
        },
      },
    });
  }

  async getAll() {
    return await this.prismaService.todoList.findMany({
      include: {
        todoListItems: true,
      },
    });
  }
}
