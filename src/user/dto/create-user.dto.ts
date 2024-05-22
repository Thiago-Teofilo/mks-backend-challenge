import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({
		example: "johndoe",
	})
	name: string;

	@ApiProperty({
		example: "johndoe23@example.com",
		description: "Email que será utilizado na autenticação. Não poderá haver emails iguais em usuários diferentes",
	})
	email: string;

	@ApiProperty({
		example: "Cada0789",
		description:
			"Senha que será utilizada na autenticação. Deverá ter pelo menos um caractere maiúsculo, um número, 5 ou mais caracteres e não deverá conter simbolos",
	})
	password: string;
}
