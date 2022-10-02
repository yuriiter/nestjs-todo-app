import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  // Get information about current user
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: Request) {
    return req.user;
  }

  // Get a list of users
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
