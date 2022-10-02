import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    try {
      return await this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          todoLists: true,
        },
      });
    } catch (error) {
      throw new BadRequestException("Invalid parameters");
    }
  }
}
