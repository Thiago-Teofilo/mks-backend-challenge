import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { AppCacheModule } from "src/cache/cache.module";

@Module({
	imports: [TypeOrmModule.forFeature([Movie]), AppCacheModule],
	controllers: [MovieController],
	providers: [MovieService],
})
export class MovieModule {}
