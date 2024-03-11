import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from '../types';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Data } from 'src/data/data.service';

@Injectable()
export class AlbumService {
  constructor(private data: Data, private favoriteService: FavoritesService) {}

  async findAll(): Promise<Album[]> {
    return this.data.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = this.data.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album is not found');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.data.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const i = this.data.albums.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Album is not found');
    }
    this.data.albums[i] = {
      ...this.data.albums[i],
      ...updateAlbumDto,
    };
    return this.data.albums[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.data.albums.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Album is not found');
    }
    this.data.albums.splice(i, 1);
    this.data.tracks = this.data.tracks.map((item) => {
      if (item.albumId === id) {
        return {
          ...item,
          albumId: null,
        };
      } else {
        return item;
      }
    });
    return true;
  }
}
