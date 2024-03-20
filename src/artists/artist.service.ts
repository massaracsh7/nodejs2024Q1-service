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
    const result = this.prisma.artists;
    if (!result) {
      throw new NotFoundException('Artists are not found');
    }
    return result;
  }

  async findOne(id: string): Promise<Artist> {
    const result = this.prisma.artists.find((item) => item.id === id);
    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
    return result;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.prisma.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const i = this.prisma.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    this.prisma.artists[i] = {
      ...this.prisma.artists[i],
      ...updateArtistDto,
    };
    return this.prisma.artists[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.prisma.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    this.prisma.artists.splice(i, 1);
    const iFav = this.prisma.favorites.artists.findIndex((item) => item === id);
    if (iFav !== -1) {
      this.favoriteService.removeArtist(id);
    }
    this.prisma.tracks = this.prisma.tracks.map((item) => {
      if (item.artistId === id) {
        return {
          ...item,
          artistId: null,
        };
      } else {
        return item;
      }
    });

    this.prisma.albums = this.prisma.albums.map((item) => {
      if (item.artistId === id) {
        return {
          ...item,
          artistId: null,
        };
      } else {
        return item;
      }
    });
    return true;
  }
}
