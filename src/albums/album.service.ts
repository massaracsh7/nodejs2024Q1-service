import { Injectable, NotFoundException } from '@nestjs/common';
//import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from '@prisma/client';
import { FavoritesService } from 'src/favorites/favorites.service';
//import { Data } from 'src/data/data.service';
import { Prisma } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: Prisma,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const result = this.prisma.album.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Album is not found');
    }
    return result;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({
      data: { ...createAlbumDto },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
    return updatedAlbum;
  }

  async remove(ID: string) {
    const tracksArr = await this.prisma.track.findMany();
    for (const item of tracksArr) {
      const { id, name, artistId, albumId, duration } = item;
      if (albumId === ID) {
        await this.prisma.track.update({
          where: { id },
          data: {
            id,
            name,
            artistId,
            albumId: null,
            duration,
          },
        });
      }
    }

    const album = await this.prisma.favoritesAlbum.findMany();
    const albumSearch = album.find((item) => item.albumID === ID);

    if (albumSearch) {
      await this.prisma.favoritesAlbum.delete({ where: { albumID: ID } });
    }
    await this.prisma.album.delete({ where: { id: ID } });
  }
}
