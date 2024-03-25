import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'prisma/prisma-client';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
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
    const result = this.prisma.track.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException('Track is not found');
    }
    return result;
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
    const track = await this.prisma.favoritesTrack.findMany();
    const result = track.find((item) => item.trackID === id);
    if (result) {
      await this.prisma.favoritesTrack.delete({ where: { trackID: id } });
    }
    await this.prisma.track.delete({ where: { id } });
  }
}
