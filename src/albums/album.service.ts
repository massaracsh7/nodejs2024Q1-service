import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto, Album } from '../types';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    this.validateUUID(id);
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;
    if (!name || !year || !artistId) {
      throw new BadRequestException('Name, year, and artistId are required');
    }
    const album: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albums.push(album);
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    this.validateUUID(id);
    const { name, year, artistId } = updateAlbumDto;
    const album = this.getAlbumById(id);
    if (name) {
      album.name = name;
    }
    if (year) {
      album.year = year;
    }
    if (artistId) {
      album.artistId = artistId;
    }
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    this.validateUUID(id);
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(index, 1);
  }

  private validateUUID(id: string): void {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID');
    }
  }
}
