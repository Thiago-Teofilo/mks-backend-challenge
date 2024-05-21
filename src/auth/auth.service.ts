import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CacheService } from "src/cache/cache.service";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private redisCache: CacheService,
	) {}

	async signIn(auth: AuthDto): Promise<any> {
		const user = await this.userService.findOne(auth);
		if (!user) {
			throw new UnauthorizedException();
		}
		const payload = { userEmail: user.email, userName: user.name };
		const token = {
			access_token: await this.jwtService.signAsync(payload),
		};
		await this.redisCache.storeData(token.access_token);
		return token;
	}
}
