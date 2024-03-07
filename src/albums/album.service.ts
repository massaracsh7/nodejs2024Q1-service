import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, Album } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return null;
    }
    this.albums[index] = {
      ...this.albums[index],
      ...updateAlbumDto,
    };
    return this.albums[index];
  }

  remove(id: string): boolean {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return false;
    }
    this.albums.splice(index, 1);
    return true;
  }
}
