import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto, Album } from '../types';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Data } from 'src/data/data.service';

@Injectable()
export class AlbumService {
  constructor(
    private database: Data,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Album[]> {
    return await this.database.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.database.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    await this.database.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const i = this.database.albums.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Album is not found');
    }
    this.database.albums[i] = {
      ...this.database.albums[i],
      ...updateAlbumDto,
    };
    return this.database.albums[i];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.database.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    this.database.albums.splice(index, 1);

    // Update associated tracks
    this.database.tracks = this.database.tracks.map((track) => {
      if (track.albumId === id) {
        return {
          ...track,
          albumId: null,
        };
      } else {
        return track;
      }
    });

    return true;
  }
}
