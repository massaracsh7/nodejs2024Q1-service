import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto, UpdateArtistDto, Artist } from '../types';
import { Data } from 'src/data/data.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private database: Data,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Artist[]> {
    const result = await this.database.artists;
    if (!result) {
      throw new NotFoundException('Artists are not found');
    }
    return result;
  }

  async findOne(id: string): Promise<Artist> {
    const result = await this.database.artists.find((item) => item.id === id);
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
    await this.database.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const i = this.database.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    this.database.artists[i] = {
      ...this.database.artists[i],
      ...updateArtistDto,
    };
    return this.database.artists[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.database.artists.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Artist is not found');
    }
    await this.database.artists.splice(i, 1);

    const iFav = this.database.favorites.artists.findIndex(
      (item) => item === id,
    );

    if (iFav !== -1) {
      this.favoriteService.removeArtistFromFavorites(id);
    }

    this.database.tracks = this.database.tracks.map((track) => {
      if (track.artistId === id) {
        return {
          ...track,
          artistId: null,
        };
      } else {
        return track;
      }
    });

    this.database.albums = this.database.albums.map((album) => {
      if (album.artistId === id) {
        return {
          ...album,
          artistId: null,
        };
      } else {
        return album;
      }
    });
    return true;
  }
}
