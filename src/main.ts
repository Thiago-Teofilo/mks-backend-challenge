import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Documentação com Swagger - Desafio Backend MKS")
		.setDescription(
			"Esta documentação interativa do Swagger permite que você execute testes manuais em nossa API. Siga os passos abaixo para usar efetivamente a API:\n\n" +
				"1. **Criação de Usuário**: Acesse o endpoint 'POST: user' para registrar um novo usuário.\n" +
				"2. **Autenticação**: Faça o login utilizando o endpoint 'POST: auth/login'. Isso irá gerar um token JWT.\n" +
				"3. **Autorização**: Copie o token JWT gerado e cole-o no campo 'Authorize' disponível no canto superior da página do Swagger. Isso habilitará o acesso aos endpoints protegidos.\n\n" +
				"Certifique-se de inserir o token corretamente para garantir acesso aos endpoints que requerem autenticação.",
		)
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Insira o Token JWT",
				in: "header",
			},
			"JWT-auth",
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT);
}
bootstrap();
