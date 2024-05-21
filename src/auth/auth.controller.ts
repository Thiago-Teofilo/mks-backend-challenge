import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { AuthGuard } from "./auth.guard";
import { Public } from "./constants/constants";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("login")
	async signIn(@Body() auth: AuthDto) {
		return await this.authService.signIn(auth);
	}

	@Get("profile")
	@ApiBearerAuth("JWT-auth")
	@UseGuards(AuthGuard)
	getProfile(@Request() req) {
		return req.user;
	}
}
