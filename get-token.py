# This library comes from `pip install oauth2client`
# It's deprecated, and should be replaced with this library: "from google.oauth2 import service_account",
# but I couldn't figure out how to get that one to spit out the token that I wanted. This one works fine for now.
# I'll look into when I have more time -bjd47
from oauth2client.service_account import ServiceAccountCredentials

SCOPES = ['https://www.googleapis.com/auth/datastore']

# replace this with the path the the private key wherever you put it or name it
SERVICE_ACCOUNT_FILE = 'calvin-soda-pop-e9e3e-c61a54784b2f.json'

credentials = ServiceAccountCredentials.from_json_keyfile_name(SERVICE_ACCOUNT_FILE, SCOPES)

credentials.get_access_token()

print(f"Current token: {credentials.access_token}")
print(f"Valid until {credentials.token_expiry}")
