import base64
import json
import os
import requests

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
REDIRECT_URI = os.environ["REDIRECT_URI"]


def lambda_handler(event, context):
    # If the request does not contain the "code" query parameter, redirect the user to the Spotify login page
    print("event", event)
    print("context", context)
    queryStringParameters = event.get("queryStringParameters", None)
    if not queryStringParameters or "code" not in queryStringParameters:
        auth_url = f"https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-library-read"
        return {
            "statusCode": 302,
            "headers": {
                "Location": auth_url
            }
        }

    # If the request contains the "code" query parameter, use it to request an access token
    else:
        code = event["queryStringParameters"]["code"]
        token_url = "https://accounts.spotify.com/api/token"
        auth_header = base64.b64encode(
            f"{CLIENT_ID}:{CLIENT_SECRET}".encode("utf-8")).decode("utf-8")
        headers = {
            "Authorization": f"Basic {auth_header}"
        }
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI
        }
        response = requests.post(token_url, headers=headers, data=data)
        token_response = response.json()

        # If the request is unsuccessful, return error message
        if response.status_code != 200:
            return {
                "statusCode": response.status_code,
                "body": json.dumps({
                    "error": token_response["error"]
                })
            }

        # If the request is successful, get user info
        user_url = "https://api.spotify.com/v1/me"
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {token_response['access_token']}"
        }
        response = requests.get(user_url, headers=headers)
        user_response = response.json()

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "access_token": token_response["access_token"]
            })
        }
