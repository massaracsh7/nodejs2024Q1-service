import { Global, Injectable, NotFoundException } from '@nestjs/common';
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
        artistsArr.find(({ id }) => id === item.artistId),
      ),
      albums: albumFavArr.map((item) =>
        albumsArr.find(({ id }) => id === item.albumId),
      ),
      tracks: trackFavArr.map((item) =>
        tracksArr.find(({ id }) => id === item.trackId),
      ),
    };
  }

  async addTrack(id: string) {
    const result = this.prisma.track.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Track is not found');
    }
    this.prisma.favoritesTrack.create({ data: { trackId: id } });
  }

  async removeTrack(id: string) {
    const result = this.prisma.track.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Track is not found');
    }
    await this.prisma.favoritesTrack.delete({ where: { trackId: id } });
  }

  async addArtist(id: string) {
    const result = this.prisma.artist.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
    await this.prisma.favoritesArtist.create({ data: { artistId: id } });
  }

  async removeArtist(id: string) {
    const result = this.prisma.artist.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
    await this.prisma.favoritesArtist.delete({ where: { artistId: id } });
  }

  async addAlbum(id: string) {
    const result = this.prisma.album.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Album is not found');
    }
    await this.prisma.favoritesAlbum.create({ data: { albumId: id } });
  }

  async removeAlbum(id: string) {
    const result = this.prisma.album.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Album is not found');
    }
    await this.prisma.favoritesAlbum.delete({ where: { albumId: id } });
  }
}
