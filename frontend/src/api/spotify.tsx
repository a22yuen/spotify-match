export const fetchUserData = async (token: string) => {
  console.log("fetching user data with token", token);
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const parsed = await response.json();
  console.log("response", parsed);
  return parsed;
};

export const fetchPlaylistItems = async (token: string, playlist: string) => {
  console.log("fetching playlist items");
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks?fields=items(track(album(images)%2C%20artists(name)%2C%20name))`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("error fetching playlist items");
    }
    const parsed = await response.json();
    return parsed?.items ?? [];
  } catch (e) {
    console.log(e);
  }
};

const addTrackToPlaylist = async (
  playlistId: string,
  tracks: string[],
  token: string
) => {
  console.log("adding tracks to playlist");
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks/`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: tracks,
        }),
      }
    );
    const parsed = await response.json();
    return parsed;
  } catch (e) {
    console.log("failed to add song to playlist: " + playlistId);
    console.log("erorr: " + e);
  }
};

export const createPlaylist = async (
  playlistItems: any[],
  userId: string,
  name: string,
  token: string
) => {
  console.log("creating playlist");
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: "Created with Spotify Match",
      }),
    }
  );
  const parsed = await response.json();
  const playlistId = parsed.id;
  const tracks = playlistItems.map((item) => "spotify:track:" + item.track.id);
  for(let i = 0; i < Math.ceil(tracks.length / 100); i++){
    try{
      const end = (i+1)*100 > tracks.length ? tracks.length : (i+1)*100;
      console.log("tracks", tracks.slice(i*100, end))
      await addTrackToPlaylist(playlistId, tracks.slice(i*100, end), token);
    } catch (e) {
      console.log("failed to add song to playlist: " + playlistId);
    }
  }
};

export const fetchPlaylistResults = async (
  playlistA: string,
  playlistB: string,
  mode: string,
  token: string
) => {
  const response = await fetch(
    "https://vhb0e07ykd.execute-api.us-east-2.amazonaws.com/filter",
    {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: mode,
        playlistA: playlistA,
        playlistB: playlistB,
      }),
    }
  );
  const parsed = await response.json();
  return parsed;
};
