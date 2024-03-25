import { Global, Injectable } from '@nestjs/common';
//import { Data } from '../data/data.service';
import { Prisma } from '../prisma/prisma.service';
import { FavoritesResponse } from 'src/types';

@Global()
@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: Prisma) {}

  async findAll(): Promise<FavoritesResponse> {
    const artistsArr = await this.prisma.artist.findMany();
    const artistFavArr = await this.prisma.favoritesArtist.findMany();
    const albumsArr = await this.prisma.album.findMany();
    const albumFavArr = await this.prisma.favoritesAlbum.findMany();
    const tracksArr = await this.prisma.track.findMany();
    const trackFavArr = await this.prisma.favoritesTrack.findMany();
    return {
      artists: artistFavArr.map((item) =>
        artistsArr.find(({ id }) => id === item.artistID),
      ),
      albums: albumFavArr.map((item) =>
        albumsArr.find(({ id }) => id === item.albumID),
      ),
      tracks: trackFavArr.map((item) =>
        tracksArr.find(({ id }) => id === item.trackID),
      ),
    };
  }

  async addTrack(id: string) {
    await this.prisma.favoritesTrack.create({ data: { trackID: id } });
  }

  async removeTrack(id: string) {
    await this.prisma.favoritesTrack.delete({ where: { trackID: id } });
  }

  async addArtist(id: string) {
    await this.prisma.favoritesArtist.create({ data: { artistID: id } });
  }

  async removeArtist(id: string) {
    await this.prisma.favoritesArtist.delete({ where: { artistID: id } });
  }

  async addAlbum(id: string) {
    await this.prisma.favoritesAlbum.create({ data: { albumID: id } });
  }

  async removeAlbum(id: string) {
    await this.prisma.favoritesAlbum.delete({ where: { albumID: id } });
  }
}
