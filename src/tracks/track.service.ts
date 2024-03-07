import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, Track } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return null;
    }
    this.tracks[index] = {
      ...this.tracks[index],
      ...updateTrackDto,
    };
    return this.tracks[index];
  }

  remove(id: string): boolean {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return false;
    }
    this.tracks.splice(index, 1);
    return true;
  }
}
