import json
import requests


def lambda_handler(event, context):
    playlistA = event["body"]["playlistA"]
    playlistB = event["body"]["playlistB"]
    playlist_endpoint = "https://api.spotify.com/v1/playlists/{}?fields=tracks.items(track(name%2Cid))"
    headers = {
        "Authorization": f"Bearer {event['body']['token']}"
    }
    response = requests.get(
        playlist_endpoint.format(playlistA), headers=headers)
    tracksA = response.json().get("tracks", {}).get("items", [])
    response = requests.get(
        playlist_endpoint.format(playlistB), headers=headers)
    tracksB = response.json().get("tracks", {}).get("items", [])

    # Filter out tracks in playlist A that are not in playlist B
    filtered = [track for track in tracksA if track not in tracksB]

    print("trackA", tracksA)
    print("trackB", tracksB)
    print("filtered", filtered)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'playlistA': playlistA,
            'playlistB': playlistB,
            'filtered': filtered,
        })
    }
