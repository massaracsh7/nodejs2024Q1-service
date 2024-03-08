import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track, User } from '../types';

@Injectable()
export class Data {
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
