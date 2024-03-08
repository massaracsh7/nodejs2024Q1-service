import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  imports: [FavoritesService, FavoritesModule],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService, FavoritesService],
})
export class ArtistModule {}
