import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('/track/:id')
  addTrackToFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/album/:id')
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/artist/:id')
  addArtistToFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
