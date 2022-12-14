import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Flag } from "@prisma/client";

@Injectable()
export class TodoListItemService {
  constructor(private prismaService: PrismaService) {}

  async changeStatus(userId: number, id: number, flag: Flag) {
    try {
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
        const searchedItem = todoListItems.find((todoListItem) => {
          return todoListItem.id === id;
        });
        return searchedItem;
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
    } catch (error) {
      throw new BadRequestException("Invalid parameters");
    }
  }
}
