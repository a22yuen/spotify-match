import base64
import json
import os
import requests

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
REDIRECT_URI = os.environ["REDIRECT_URI"]


def lambda_handler(event, context):
    print("callback")
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
    print("try response")
    response = requests.post(token_url, headers=headers, data=data)
    token_response = response.json()
    print("token_response", token_response)
    # If the request is unsuccessful, return error message
    if 'error' in token_response:
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "error": token_response
            })
        }

    # If the request is successful, get user info
    user_url = "https://api.spotify.com/v1/me"
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {token_response['access_token']}"
    }
    print("pre user")
    response = requests.get(user_url, headers=headers)
    print(response)
    user_response = response.json()
    print("user_response", user_response)
    if 'error' in user_response:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "error": user_response
            })
        }

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "access_token": token_response["access_token"],
            "user": user_response
        })
    }
