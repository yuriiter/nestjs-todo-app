import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Sign in
  @Post("signin")
  postLogin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  // Sign up
  @Post("signup")
  postSignup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }
}
