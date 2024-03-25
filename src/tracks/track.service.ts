import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../types';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';
//import { Data } from 'src/data/data.service';
import { Prisma } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private prisma: Prisma,
    private favoriteService: FavoritesService,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track is not found');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({
      data: { ...createTrackDto },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.prisma.favouritesTrack.findMany();
    const favTrack = track.find(({ trackId }) => trackId === id);

    if (favTrack) {
      await this.prisma.favouritesTrack.delete({ where: { trackId: id } });
    }
    await this.prisma.track.delete({ where: { id } });
  }
}
