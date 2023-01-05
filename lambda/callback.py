import base64
import json
import os
import requests

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
REDIRECT_URI = os.environ["REDIRECT_URI"]
CALLBACK_URL = os.environ["CALLBACK_URL"]


def lambda_handler(event, context):
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
    if 'error' in token_response:
        return {
            "statusCode": 400,
            "headers": {
                "Location": f"{CALLBACK_URL}/error",
            }
        }

    return {
        "statusCode": 301,
        "headers": {
            "Location": f"{CALLBACK_URL}/auth/{token_response['access_token']}",
        }
    }
