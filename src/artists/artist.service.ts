import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../types';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { Data } from 'src/data/data.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(private data: Data, private favoriteService: FavoritesService) {}

  async findAll(): Promise<Artist[]> {
    const result = this.data.artists;
    if (!result) {
      throw new NotFoundException('Artists are not found');
    }
    return result;
  }

  async findOne(id: string): Promise<Artist> {
    const result = this.data.artists.find((item) => item.id === id);
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
    this.data.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const i = this.data.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    this.data.artists[i] = {
      ...this.data.artists[i],
      ...updateArtistDto,
    };
    return this.data.artists[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.data.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    this.data.artists.splice(i, 1);
    const iFav = this.data.favorites.artists.findIndex((item) => item === id);
    if (iFav !== -1) {
      this.favoriteService.removeArtist(id);
    }
    this.data.tracks = this.data.tracks.map((item) => {
      if (item.artistId === id) {
        return {
          ...item,
          artistId: null,
        };
      } else {
        return item;
      }
    });

    this.data.albums = this.data.albums.map((item) => {
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
