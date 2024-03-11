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
  constructor(private readonly data: Data) {}

  async findAll(): Promise<FavoritesResponse> {
    const favoriteArtists = await this.idArtists(this.data.favorites.artists);
    const favoriteAlbums = await this.idAlbums(this.data.favorites.albums);
    const favoriteTracks = await this.idTracks(this.data.favorites.tracks);

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  private async idArtists(artistIds: string[]): Promise<Artist[]> {
    const favoriteArtists: Artist[] = [];
    for (const artistId of artistIds) {
      const artist = this.data.artists.find((artist) => artist.id === artistId);
      if (artist) {
        favoriteArtists.push(artist);
      }
    }
    return favoriteArtists;
  }

  private async idAlbums(albumIds: string[]): Promise<Album[]> {
    const favoriteAlbums: Album[] = [];
    for (const albumId of albumIds) {
      const album = this.data.albums.find((album) => album.id === albumId);
      if (album) {
        favoriteAlbums.push(album);
      }
    }
    return favoriteAlbums;
  }

  private async idTracks(trackIds: string[]): Promise<Track[]> {
    const favoriteTracks: Track[] = [];
    for (const trackId of trackIds) {
      const track = this.data.tracks.find((track) => track.id === trackId);
      if (track) {
        favoriteTracks.push(track);
      }
    }
    return favoriteTracks;
  }

  async addTrack(trackId: string): Promise<Track | undefined> {
    const track = this.data.tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    const isTrackInFavorites = this.data.favorites.tracks.includes(trackId);
    if (isTrackInFavorites) {
      throw new BadRequestException('Already in favorites tracks');
    }
    this.data.favorites.tracks.push(trackId);
    return track;
  }

  removeTrack(trackId: string) {
    const index = this.data.favorites.tracks.findIndex((id) => id === trackId);
    if (index === -1) {
      throw new NotFoundException('Track is not found in favorites');
    }
    this.data.favorites.tracks.splice(index, 1);
    return 'Track removed from favorites';
  }

  addAlbum(albumId: string) {
    const album = this.data.albums.find((a) => a.id === albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album is not found');
    }
    const isAlbumInFavorites = this.data.favorites.albums.includes(albumId);
    if (isAlbumInFavorites) {
      throw new BadRequestException('Already in favorites albums');
    }
    this.data.favorites.albums.push(albumId);
    return 'Album to favorites';
  }

  removeAlbum(albumId: string) {
    const index = this.data.favorites.albums.findIndex((id) => id === albumId);
    if (index === -1) {
      throw new NotFoundException('Album is not found in favorites');
    }
    this.data.favorites.albums.splice(index, 1);
    return 'Album removed from favorites';
  }

  addArtist(artistId: string) {
    const artist = this.data.artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const isArtistInFavorites = this.data.favorites.artists.includes(artistId);
    if (isArtistInFavorites) {
      throw new BadRequestException('Already in favorites artists');
    }
    this.data.favorites.artists.push(artistId);
    return 'Artist to favorites';
  }

  removeArtist(artistId: string) {
    const index = this.data.favorites.artists.findIndex(
      (id) => id === artistId,
    );
    if (index === -1) {
      throw new NotFoundException('Artist is not found in favorites');
    }
    this.data.favorites.artists.splice(index, 1);
    return 'Artist removed from favorites';
  }
}
