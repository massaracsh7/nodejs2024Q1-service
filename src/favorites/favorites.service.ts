import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesResponse } from '../types';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponse> {
    const artists = await this.artistService.findAll();
    const albums = await this.albumService.getAllAlbums();
    const tracks = await this.trackService.findAll();
    return { artists, albums, tracks };
  }

  async addTrackToFavorites(trackId: string): Promise<string> {
    // Check if track exists
    const track = await this.trackService.findOne(trackId);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    // Add track to favorites logic
    return 'Track added to favorites';
  }

  async removeTrackFromFavorites(trackId: string): Promise<string> {
    // Check if track exists
    const track = await this.trackService.findOne(trackId);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    // Remove track from favorites logic
    return 'Track removed from favorites';
  }

  async addAlbumToFavorites(albumId: string): Promise<string> {
    // Check if album exists
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    // Add album to favorites logic
    return 'Album added to favorites';
  }

  async removeAlbumFromFavorites(albumId: string): Promise<string> {
    // Check if album exists
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    // Remove album from favorites logic
    return 'Album removed from favorites';
  }

  async addArtistToFavorites(artistId: string): Promise<string> {
    // Check if artist exists
    const artist = await this.artistService.findOne(artistId);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    // Add artist to favorites logic
    return 'Artist added to favorites';
  }

  async removeArtistFromFavorites(artistId: string): Promise<string> {
    // Check if artist exists
    const artist = await this.artistService.findOne(artistId);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    // Remove artist from favorites logic
    return 'Artist removed from favorites';
  }
}
