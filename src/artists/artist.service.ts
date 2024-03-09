import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto, UpdateArtistDto, Artist } from '../types';
import { Data } from 'src/data/data.service';

@Injectable()
export class ArtistService {
  constructor(private database: Data) {}

  findAll(): Artist[] {
    return this.database.artists;
  }

  findOne(id: string): Artist {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.database.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.database.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.database.artists[artistIndex] = {
      ...this.database.artists[artistIndex],
      ...updateArtistDto,
    };
    return this.database.artists[artistIndex];
  }

  remove(id: string): boolean {
    const artistIndex = this.database.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.database.artists.splice(artistIndex, 1);
    return true;
  }
}
