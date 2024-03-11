import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../types';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Data } from 'src/data/data.service';

@Injectable()
export class TrackService {
  constructor(private data: Data, private favoriteService: FavoritesService) {}

  async findAll(): Promise<Track[]> {
    return this.data.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = this.data.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track is not found');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.data.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const i = this.data.tracks.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Track is not found');
    }
    this.data.tracks[i] = {
      ...this.data.tracks[i],
      ...updateTrackDto,
    };
    return this.data.tracks[i];
  }

  async remove(id: string): Promise<boolean> {
    const i = this.data.tracks.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new NotFoundException('Track is not found');
    }
    this.data.tracks.splice(i, 1);
    const iFav = this.data.favorites.tracks.findIndex((item) => item === id);
    if (iFav !== -1) {
      this.favoriteService.removeTrack(id);
    }
    return true;
  }
}
