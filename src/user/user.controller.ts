import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "src/auth/constants/constants";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}
}
