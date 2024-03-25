import { Injectable, NotFoundException } from '@nestjs/common';
//import { v4 as uuidv4 } from 'uuid';
import { Artist } from 'prisma/prisma-client';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
//import { Data } from 'src/data/data.service';
import { Prisma } from 'src/prisma/prisma.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: Prisma,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const result = this.prisma.artist.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
    return result;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: { ...createArtistDto },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const newArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
    return newArtist;
  }

  async remove(ID: string) {
    const albumsArr = await this.prisma.album.findMany();
    for (const item of albumsArr) {
      const { id, name, year, artistId } = item;
      if (artistId === ID) {
        await this.prisma.album.update({
          where: { id },
          data: {
            id,
            name,
            year,
            artistId: null,
          },
        });
      }
    }

    const tracksArr = await this.prisma.track.findMany();
    for (const item of tracksArr) {
      const { id, name, artistId, albumId, duration } = item;
      if (artistId === ID) {
        await this.prisma.track.update({
          where: { id },
          data: {
            id,
            name,
            artistId: null,
            albumId,
            duration,
          },
        });
      }
    }

    const artistArr = await this.prisma.favoritesArtist.findMany();
    const artistSearch = artistArr.find((item) => item.artistID === ID);

    if (artistSearch) {
      await this.prisma.favoritesArtist.delete({ where: { artistID: ID } });
    }
    await this.prisma.artist.delete({ where: { id: ID } });
  }
}
