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
  addTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.addTrack(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.removeTrack(trackId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.addAlbum(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.removeAlbum(albumId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.addArtist(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.removeArtist(artistId);
  }
}
