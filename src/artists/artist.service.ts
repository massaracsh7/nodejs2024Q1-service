import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../types';
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
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
    return updatedArtist;
  }

  async remove(ID: string) {
    const albums = await this.prisma.album.findMany();
    for (const album of albums) {
      const { id, name, year, artistId } = album;
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

    const tracks = await this.prisma.track.findMany();
    for (const track of tracks) {
      const { id, name, artistId, albumId, duration } = track;
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

    const artist = await this.prisma.favouritesArtist.findMany();
    const favArtist = artist.find(({ artistId }) => artistId === ID);

    if (favArtist) {
      await this.prisma.favouritesArtist.delete({ where: { artistId: ID } });
    }
    await this.prisma.artist.delete({ where: { id: ID } });
  }
}
