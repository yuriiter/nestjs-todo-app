import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Flag } from "@prisma/client";

@Injectable()
export class TodoListItemService {
  constructor(private prismaService: PrismaService) {}

  async changeStatus(userId: number, id: number, flag: Flag) {
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
    const todoListItemExists = todoLists.find((todoList) => {
      const todoListItems = todoList.todoListItems;
      return todoListItems.find((todoListItem) => todoListItem.id === id);
    });

    if (!todoListItemExists) {
      throw new BadRequestException("Invalid user or item id");
    }

    return await this.prismaService.todoListItem.update({
      where: {
        id: id,
      },
      data: {
        flag: flag,
      },
    });
  }
}
