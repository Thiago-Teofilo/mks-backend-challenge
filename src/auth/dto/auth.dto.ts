import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
	@ApiProperty({
		example: "johndoe23@example.com",
		description: "E-mail de um usuário previamente criado que será autenticado",
	})
	email: string;

	@ApiProperty({
		example: "Cada0788",
		description: "Senha de um usuário previamente criado que será autenticado",
	})
	password: string;
}
