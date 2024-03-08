import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artists/artist.module';
import { TrackModule } from './tracks/track.module';
import { AlbumModule } from './albums/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
