import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavoritesModule } from '../favorites/favorites.module'; // Import FavoritesModule
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  imports: [FavoritesService, FavoritesModule], // Use FavoritesModule instead of FavoritesService
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService, FavoritesService], // You don't need to export FavoritesService here
})
export class AlbumModule {}
