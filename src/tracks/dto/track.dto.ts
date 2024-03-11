import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
