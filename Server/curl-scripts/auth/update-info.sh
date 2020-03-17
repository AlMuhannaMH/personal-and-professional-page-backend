#!/bin/bash

API="http://localhost:4741"
URL_PATH="/update-info"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "userNewInfo": {
      "firstName": "'"${FIRSTNAME}"'",
      "lastName": "'"${LASTNAME}"'",
      "label": "'"${LABEL}"'",
      "phone": "'"${PHONE}"'",
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
