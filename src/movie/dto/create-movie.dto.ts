import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class CreateMovieDto {
	@ApiProperty({
		example: "De Volta para o Futuro",
		description: "Nome do filme",
	})
	@Column()
	name: string;
}
