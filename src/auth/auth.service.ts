import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          passwordHash: hash,
        },
      });
      delete user.passwordHash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw error;
    }
  }

  async signin(authDto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new BadRequestException("Bad credentials");
    }
    const passwordVerified = await argon.verify(
      user.passwordHash,
      authDto.password,
    );
    if (!passwordVerified) {
      throw new BadRequestException("Bad credentials");
    }

    const token = await this.signToken(user.email, user.id);
    return {
      access_token: token,
    };
  }

  signToken(email: string, userId: number) {
    const data = {
      sub: userId,
      email,
    };
    return this.jwtService.signAsync(data, {
      // TODO set 15m
      expiresIn: "150000m",
      secret: this.configService.get("JWT_SECRET"),
    });
  }
}
