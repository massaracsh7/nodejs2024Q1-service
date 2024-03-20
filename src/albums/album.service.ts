import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from '../types';
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
    return this.prisma.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = this.prisma.albums.find((album) => album.id === id);
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
    this.prisma.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const i = this.prisma.albums.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Album is not found');
    }
    this.prisma.albums[i] = {
      ...this.prisma.albums[i],
      ...updateAlbumDto,
    };
    return this.prisma.albums[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.prisma.albums.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Album is not found');
    }
    this.prisma.albums.splice(i, 1);
    const iFav = this.prisma.favorites.albums.findIndex((item) => item === id);
    if (iFav !== -1) {
      this.favoriteService.removeAlbum(id);
    }
    this.prisma.tracks = this.prisma.tracks.map((item) => {
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
