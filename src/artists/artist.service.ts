import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto, UpdateArtistDto, Artist } from '../types';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      return null; // Artist not found
    }
    this.artists[index] = {
      ...this.artists[index],
      ...updateArtistDto,
    };
    return this.artists[index];
  }

  remove(id: string): boolean {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      return false; // Artist not found
    }
    this.artists.splice(index, 1);
    return true;
  }
}
