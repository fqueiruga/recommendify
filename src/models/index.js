export class Artist {
  static fromSpotifyApi(apiArtist) {
    const { id, name, images, genres, uri } = apiArtist;
    return {
      id,
      name,
      genres,
      uri,
      imageUrl: images[0] && images[0].url
    };
  }
}

export class Song {
  static fromSpotifyApi(apiTrack) {
    const { id, name, artists, album, uri } = apiTrack;
    return {
      id,
      name,
      artists: artists.map(simpleArtist => ({
        id: simpleArtist.id,
        name: simpleArtist.name
      })),
      album: {
        id: album.id,
        name: album.name,
        imageUrl: album.images[0] && album.images[0].url
      },
      uri
    };
  }
}

export class Playlist {
  static fromSpotifyApi(apiPlaylist) {
    const { id, name, uri, images } = apiPlaylist;
    return {
      id,
      name,
      uri,
      imageUrl: images[0] && images[0].url
    };
  }
}
