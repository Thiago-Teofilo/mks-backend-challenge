import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { RedisClientOptions } from "redis";

@Module({
	imports: [
		CacheModule.register<RedisClientOptions>({
			store: redisStore,
			socket: {
				host: process.env.REDIS_HOST ?? "localhost",
				port: parseInt(process.env.REDIS_PORT ?? "6379"),
			},
		}),
	],
	providers: [CacheService],
	exports: [CacheService],
})
export class AppCacheModule {}
