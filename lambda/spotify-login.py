import os
import json

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
REDIRECT_URI = os.environ["REDIRECT_URI"]


def lambda_handler(event, context):
    print('login redirect')
    auth_url = f"https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-library-read"
    return {
        "statusCode": 302,
        # return auth url instead of auto redirect due to cors error
        "body": json.dumps({
            "auth_url": auth_url
        })
    }
