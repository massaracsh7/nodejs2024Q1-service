import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsOptional()
  artistId: string | null;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsOptional()
  artistId: string | null;
}
