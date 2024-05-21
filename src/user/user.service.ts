import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthDto } from "src/auth/dto/auth.dto";
import validatePassword from "src/utils/validate-password";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		validatePassword(createUserDto.password);

		const usersWithSameEmail = await this.userRepository.findBy({
			email: createUserDto.email,
		});

		if (usersWithSameEmail.length) {
			throw new ConflictException("Email already in use");
		}

		const user = this.userRepository.create(createUserDto);
		return await this.userRepository.save(user);
	}

	async findOne(authDto: AuthDto): Promise<User | null> {
		return await this.userRepository.findOneBy({
			email: authDto.email,
			password: authDto.password,
		});
	}
}
