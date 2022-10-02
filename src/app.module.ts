import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TodoListModule } from "./todo-list/todo-list.module";
import { TodoListItemModule } from "./todo-list-item/todo-list-item.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    TodoListModule,
    TodoListItemModule,
    PrismaModule,
    UserModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
