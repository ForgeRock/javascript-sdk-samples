AM_URL=$1
USERNAME=$2
PASSWORD=$3
APP_URL=$4

# Get a session token
TOKEN=$(curl -X POST \
  -H 'accept-api-version: resource=2.0,protocol=1.0' \
  -H 'accept: application/json' \
  -H 'x-openam-username: '"$USERNAME"'' \
  -H 'x-openam-password: '"$PASSWORD"'' \
  -H 'x-requested-with: curl' \
  $AM_URL/json/realms/root/authenticate | jq -r '.tokenId')

echo Got token $TOKEN

# Set CORS
curl -X PUT \
  -H 'iPlanetDirectoryPro: '"$TOKEN"'' \
  -H 'content-type: application/json' \
  -H 'x-requested-with: curl' \
  -d "{
    \"maxAge\": 600,
    \"exposedHeaders\": [\"WWW-Authenticate\"],
    \"acceptedOrigins\": [\"$APP_URL\"],
    \"acceptedMethods\": [\"HEAD\", \"DELETE\", \"POST\", \"GET\", \"PUT\", \"PATCH\"],
    \"acceptedHeaders\": [\"*\"],
    \"allowCredentials\": true,
    \"enabled\": true
  }" \
  $AM_URL/json/global-config/services/CorsService/sdk

