import {
  BadRequestException,
  Global,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Data } from '../data/data.service';
import { Album, Artist, FavoritesResponse, Track } from 'src/types';

@Global()
@Injectable()
export class FavoritesService {
  constructor(private readonly database: Data) {}

  async findAll(): Promise<FavoritesResponse> {
    const favoriteArtists = await this.mapIdsToArtists(
      this.database.favorites.artists,
    );
    const favoriteAlbums = await this.mapIdsToAlbums(
      this.database.favorites.albums,
    );
    const favoriteTracks = await this.mapIdsToTracks(
      this.database.favorites.tracks,
    );

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  private async mapIdsToArtists(artistIds: string[]): Promise<Artist[]> {
    const favoriteArtists: Artist[] = [];
    for (const artistId of artistIds) {
      const artist = this.database.artists.find(
        (artist) => artist.id === artistId,
      );
      if (artist) {
        favoriteArtists.push(artist);
      }
    }
    return favoriteArtists;
  }

  private async mapIdsToAlbums(albumIds: string[]): Promise<Album[]> {
    const favoriteAlbums: Album[] = [];
    for (const albumId of albumIds) {
      const album = this.database.albums.find((album) => album.id === albumId);
      if (album) {
        favoriteAlbums.push(album);
      }
    }
    return favoriteAlbums;
  }

  private async mapIdsToTracks(trackIds: string[]): Promise<Track[]> {
    const favoriteTracks: Track[] = [];
    for (const trackId of trackIds) {
      const track = this.database.tracks.find((track) => track.id === trackId);
      if (track) {
        favoriteTracks.push(track);
      }
    }
    return favoriteTracks;
  }

  async addTrack(trackId: string): Promise<Track | undefined> {
    const track = this.database.tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    const isTrackInFavorites = this.database.favorites.tracks.includes(trackId);
    if (isTrackInFavorites) {
      throw new BadRequestException('Track already in favorites');
    }
    this.database.favorites.tracks.push(trackId);
    return track;
  }

  removeTrack(trackId: string) {
    const index = this.database.favorites.tracks.findIndex(
      (id) => id === trackId,
    );
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.database.favorites.tracks.splice(index, 1);
    return 'Track removed from favorites';
  }

  addAlbum(albumId: string) {
    const album = this.database.albums.find((a) => a.id === albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    const isAlbumInFavorites = this.database.favorites.albums.includes(albumId);
    if (isAlbumInFavorites) {
      throw new BadRequestException('Album already in favorites');
    }
    this.database.favorites.albums.push(albumId);
    return 'Album added to favorites';
  }

  removeAlbum(albumId: string) {
    const index = this.database.favorites.albums.findIndex(
      (id) => id === albumId,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.database.favorites.albums.splice(index, 1);
    return 'Album removed from favorites';
  }

  addArtist(artistId: string) {
    const artist = this.database.artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const isArtistInFavorites =
      this.database.favorites.artists.includes(artistId);
    if (isArtistInFavorites) {
      throw new BadRequestException('Album already in favorites');
    }
    this.database.favorites.artists.push(artistId);
    return 'Artist added to favorites';
  }

  removeArtist(artistId: string) {
    const index = this.database.favorites.artists.findIndex(
      (id) => id === artistId,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.database.favorites.artists.splice(index, 1);
    return 'Artist removed from favorites';
  }
}
