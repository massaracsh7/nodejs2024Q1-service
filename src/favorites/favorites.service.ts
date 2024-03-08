import { Injectable, NotFoundException } from '@nestjs/common';
import { Data } from '../data/data.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly data: Data) {}

  getAllFavorites() {
    const { artists, albums, tracks } = this.data.favorites;
    return { artists, albums, tracks };
  }

  addTrackToFavorites(trackId: string) {
    const track = this.data.tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    this.data.favorites.tracks.push(trackId);
    return 'Track added to favorites';
  }

  removeTrackFromFavorites(trackId: string) {
    const index = this.data.favorites.tracks.findIndex((id) => id === trackId);
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.data.favorites.tracks.splice(index, 1);
    return 'Track removed from favorites';
  }

  addAlbumToFavorites(albumId: string) {
    const album = this.data.albums.find((a) => a.id === albumId);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.data.favorites.albums.push(albumId);
    return 'Album added to favorites';
  }

  removeAlbumFromFavorites(albumId: string) {
    const index = this.data.favorites.albums.findIndex((id) => id === albumId);
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.data.favorites.albums.splice(index, 1);
    return 'Album removed from favorites';
  }

  addArtistToFavorites(artistId: string) {
    const artist = this.data.artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.data.favorites.artists.push(artistId);
    return 'Artist added to favorites';
  }

  removeArtistFromFavorites(artistId: string) {
    const index = this.data.favorites.artists.findIndex(
      (id) => id === artistId,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.data.favorites.artists.splice(index, 1);
    return 'Artist removed from favorites';
  }
}
