import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { RankingController } from './ranking/ranking.controller';
import { PlayerService } from './player/player.service';
import { RankingService } from './ranking/ranking.service';
import { MatchService } from './match/match.service';
import { PlayerDB } from './player/player.entity';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        TypeOrmModule.forFeature([PlayerDB]),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),],
    controllers: [AppController, PlayerController, MatchController, RankingController],
    providers: [PlayerService, RankingService, MatchService],
})
export class AppModule { }
