export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateUserDto {
  login: string;
  password: string;
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

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class CreateArtistDto {
  readonly name: string;
  readonly grammy: boolean;
}

export class UpdateArtistDto {
  readonly name?: string;
  readonly grammy?: boolean;
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
