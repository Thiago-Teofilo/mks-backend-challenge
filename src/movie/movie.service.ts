import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(Movie)
		private movieRepository: Repository<Movie>,
	) {}

	async create(createMovieDto: CreateMovieDto): Promise<Movie> {
		const movie = this.movieRepository.create(createMovieDto);
		return await this.movieRepository.save(movie);
	}

	async findAll(): Promise<Movie[]> {
		return await this.movieRepository.find();
	}

	async findOne(id: number): Promise<Movie | null> {
		const movie = await this.movieRepository.findOneBy({ id });

		if (!movie) {
			throw new NotFoundException("Movie not exists");
		}

		return movie;
	}

	async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
		const movie = await this.movieRepository.preload({
			id: id,
			...updateMovieDto,
		});

		if (!movie) {
			throw new NotFoundException("Movie not exists");
		}

		return this.movieRepository.save(movie);
	}

	async remove(id: number): Promise<DeleteResult> {
		const movie = await this.movieRepository.delete(id);

		if (!movie) {
			throw new NotFoundException("Movie not exists");
		}

		return movie;
	}
}
