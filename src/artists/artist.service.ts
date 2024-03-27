import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const result = this.prisma.artist.findMany();
    if (!result) {
      throw new HttpException('Artists are not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findOne(id: string): Promise<Artist> {
    const result = this.prisma.artist.findFirstOrThrow({ where: { id } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: { ...createArtistDto },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const result = this.prisma.artist.findFirstOrThrow({ where: { id } });
    if (!result) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    const newArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
    return newArtist;
  }

  async remove(id: string) {
    const result = this.prisma.artist.findFirstOrThrow({ where: { id } });
    if (!result) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    const albumsArr = await this.prisma.album.findMany();
    for (const item of albumsArr) {
      const { id, name, year, artistId } = item;
      if (artistId === id) {
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
      if (artistId === id) {
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
    const artistSearch = artistArr.find((item) => item.artistId === id);
    if (artistSearch) {
      await this.prisma.favoritesArtist.delete({ where: { artistId: id } });
    }
    await this.prisma.artist.delete({ where: { id } });
  }
}
