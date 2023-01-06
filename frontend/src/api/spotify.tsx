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
    const parsed = await response.json();
    return parsed?.items ?? [];
  } catch (e) {
    console.log("error fetching playlist items", e);
  }
};

export const fetchPlaylists = async (
  playlistA: string,
  playlistB: string,
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
        playlistA: playlistA,
        playlistB: playlistB,
      }),
    }
  );
  const parsed = await response.json();
  return parsed;
};
