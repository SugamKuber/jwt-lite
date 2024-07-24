# Demo app for jwt-lite-2024 in next js

### Install the pkg
```
npm install jwt-lite-2024
```
### Run the next app
```
npm run dev
```
### Test using curl
- create the token
```
curl --location 'http://localhost:3000/api/create' \
--header 'Content-Type: application/json' \
--data '{
    "id": "<id>",
    "payload": {
        "name": "<user>"
    }
}'
```
- validate & decode the token
```
curl --location 'http://localhost:3000/api/check' \
--header 'Authorization: Bearer <token>'

```