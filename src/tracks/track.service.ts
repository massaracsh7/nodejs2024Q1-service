import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, Track } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Data } from 'src/data/data.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(
    private database: Data,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.database.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    await this.database.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const trackIndex = this.database.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }
    this.database.tracks[trackIndex] = {
      ...this.database.tracks[trackIndex],
      ...updateTrackDto,
    };
    return this.database.tracks[trackIndex];
  }

  async remove(id: string): Promise<boolean> {
    const trackIndex = this.database.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }
    this.database.tracks.splice(trackIndex, 1);
    return true;
  }
}
