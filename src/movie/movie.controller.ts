import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Movies")
@Controller("movie")
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@ApiBearerAuth("JWT-auth")
	@Post()
	@UseGuards(AuthGuard)
	create(@Body() createMovieDto: CreateMovieDto) {
		return this.movieService.create(createMovieDto);
	}

	@ApiBearerAuth("JWT-auth")
	@Get()
	@UseGuards(AuthGuard)
	findAll() {
		return this.movieService.findAll();
	}

	@ApiBearerAuth("JWT-auth")
	@Get(":id")
	@UseGuards(AuthGuard)
	findOne(@Param("id") id: string) {
		return this.movieService.findOne(+id);
	}

	@ApiBearerAuth("JWT-auth")
	@Patch(":id")
	@UseGuards(AuthGuard)
	update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
		return this.movieService.update(+id, updateMovieDto);
	}

	@ApiBearerAuth("JWT-auth")
	@Delete(":id")
	@UseGuards(AuthGuard)
	remove(@Param("id") id: string) {
		return this.movieService.remove(+id);
	}
}
