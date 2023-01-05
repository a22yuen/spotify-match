import json
import requests


def lambda_handler(event, context):
    mode = event["queryStringParameters"]["mode"]
    print("==event", event)
    body = json.loads(event["body"])
    print("==event body", body)
    print("==event headers", event["headers"])
    print("==event headers auth", event["headers"]["authorization"])
    token = event["headers"]["authorization"].split(' ')[1]
    print("==token", token)
    playlistA = body["playlistA"]
    playlistB = body["playlistB"]
    # playlist_endpoint = "https://api.spotify.com/v1/playlists/{}/tracks?fields=items(track(name%2Cid))"
    playlist_endpoint = "https://api.spotify.com/v1/playlists/{}/tracks?fields=items(track(album(images)%2C%20artists(name)%2C%20name))"
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.get(
        playlist_endpoint.format(playlistA), headers=headers)
    tracksA = response.json().get("items", [])
    response = requests.get(
        playlist_endpoint.format(playlistB), headers=headers)
    tracksB = response.json().get("items", [])

    # Filter out tracks in playlist A that are not in playlist B
    filtered = [track for track in tracksA if track not in tracksB] if mode == "filter" else [track for track in tracksA if track in tracksB] 

    print("trackA", tracksA)
    print("trackB", tracksB)
    print("filtered", filtered)

    return {
        'statusCode': 200,
        'headers': {},
        'body': json.dumps({
            'playlistA': playlistA,
            'playlistB': playlistB,
            'filtered': filtered,
        })
    }
