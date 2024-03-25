import {
  BadRequestException,
  Global,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
//import { Data } from '../data/data.service';
import { Prisma } from '../prisma/prisma.service';
import { FavoritesResponse } from 'src/types';

@Global()
@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: Prisma) {}

  async findAll(): Promise<FavoritesResponse> {
    const artists = await this.prisma.artist.findMany();
    const fArtist = await this.prisma.favouritesArtist.findMany();

    const albums = await this.prisma.album.findMany();
    const fAlbum = await this.prisma.favouritesAlbum.findMany();

    const tracks = await this.prisma.track.findMany();
    const fTrack = await this.prisma.favouritesTrack.findMany();

    return {
      artists: fArtist.map((item) =>
        artists.find(({ id }) => id === item.artistId),
      ),
      albums: fAlbum.map((item) =>
        albums.find(({ id }) => id === item.albumId),
      ),
      tracks: fTrack.map((item) =>
        tracks.find(({ id }) => id === item.trackId),
      ),
    };
  }

  async getFavTracks(): Promise<string[]> {
    const result = await this.prisma.favouritesTrack.findMany();
    return result.map(({ trackId }) => trackId);
  }

  async getFavAlbums(): Promise<string[]> {
    const result = await this.prisma.favouritesAlbum.findMany();
    return result.map(({ albumId }) => albumId);
  }

  async getFavArtists(): Promise<string[]> {
    const result = await this.prisma.favouritesArtist.findMany();
    return result.map(({ artistId }) => artistId);
  }

  async addTrackFav(id: string) {
    await this.prisma.favouritesTrack.create({ data: { trackId: id } });
  }

  async removeTrackFav(id: string) {
    await this.prisma.favouriteTrack.delete({ where: { trackId: id } });
  }

  async addArtistFav(id: string) {
    await this.prisma.favouritesArtist.create({ data: { artistId: id } });
  }

  async removeArtistFav(id: string) {
    await this.prisma.favouritesArtist.delete({ where: { artistId: id } });
  }

  async addAlbumFav(id: string) {
    await this.prisma.favouritesAlbum.create({ data: { albumId: id } });
  }

  async removeAlbumFavDB(id: string) {
    await this.prisma.favouritesAlbum.delete({ where: { albumId: id } });
  }
}
