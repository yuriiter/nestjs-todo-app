import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
  exports: [PrismaService],
  imports: [ConfigModule.forRoot()],

  providers: [PrismaService],
})
export class PrismaModule {}
