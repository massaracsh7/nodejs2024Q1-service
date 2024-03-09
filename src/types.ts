import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class User_Created implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User_Created>) {
    Object.assign(this, partial);
  }
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

export class CreateTrackDto {
  readonly name: string;
  readonly artistId: string;
  readonly albumId: string;
  readonly duration: number;
}

export class UpdateTrackDto {
  readonly name?: string;
  readonly artistId?: string;
  readonly albumId?: string;
  readonly duration?: number;
}

export class UpdateAlbumDto {
  readonly name?: string;
  readonly year?: number;
  readonly artistId?: string;
}

export class CreateAlbumDto {
  readonly name: string;
  readonly year: number;
  readonly artistId: string;
}

import { IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsUUID()
  readonly id: string;
}

@Injectable()
export class Database {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
