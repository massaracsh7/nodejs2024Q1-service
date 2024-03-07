import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Delete('track/:id')
  removeTrackFromFavorites(@Param('id') trackId: string) {
    return this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Delete('album/:id')
  removeAlbumFromFavorites(@Param('id') albumId: string) {
    return this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Delete('artist/:id')
  removeArtistFromFavorites(@Param('id') artistId: string) {
    return this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
