import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from '../types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    const artists = this.artistService.findAll();
    return { statusCode: 200, data: artists };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      return { statusCode: 400, message: 'Invalid artist ID' };
    }
    const artist = this.artistService.findOne(id);
    if (!artist) {
      return { statusCode: 404, message: 'Artist not found' };
    }
    return { statusCode: 200, data: artist };
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name) {
      return { statusCode: 400, message: 'Artist name is required' };
    }
    const newArtist = this.artistService.create(createArtistDto);
    return { statusCode: 201, data: newArtist };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!this.isValidUUID(id)) {
      return { statusCode: 400, message: 'Invalid artist ID' };
    }
    const updatedArtist = this.artistService.update(id, updateArtistDto);
    if (!updatedArtist) {
      return { statusCode: 404, message: 'Artist not found' };
    }
    return { statusCode: 200, data: updatedArtist };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      return { statusCode: 400, message: 'Invalid artist ID' };
    }
    const result = this.artistService.remove(id);
    if (!result) {
      return { statusCode: 404, message: 'Artist not found' };
    }
    return { statusCode: 204 };
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
