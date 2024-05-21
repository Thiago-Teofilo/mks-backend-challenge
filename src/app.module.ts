import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MovieModule } from "./movie/movie.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AppCacheModule } from "./cache/cache.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
	imports: [
		MovieModule,
		UserModule,
		AppCacheModule,
		AuthModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.DATABASE_HOST ?? "localhost",
			port: parseInt(process.env.DATABASE_PORT) ?? 5432,
			username: process.env.DATABASE_USERNAME ?? "docker",
			password: process.env.DATABASE_PASSWORD ?? "docker",
			database: process.env.DATABASE_NAME ?? "mks",
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}