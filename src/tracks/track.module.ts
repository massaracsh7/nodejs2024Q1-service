import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  imports: [FavoritesService, FavoritesModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService, FavoritesService],
})
export class TrackModule {}
