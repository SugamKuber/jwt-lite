# jwt-lite

jwt-lite is a lightweight npm library for handling JWT tokens in JavaScript and TypeScript applications. It provides simple methods for encoding, decoding, and validating JWT tokens with a focus on ease of use.

jwt-lite offers a streamlined approach to JWT implementation, making it an ideal choice for developers seeking a straightforward and reliable JWT solution.

## Functions 

1. *encode()*: Creates a new JWT token by combining a unique identifier, custom payload, and optional parameters, returning a signed string token.
```
encode(id, payload, options):string
```
2. *decode()*: Parses a JWT token string, verifies its signature, and returns the decoded payload along with expiration information, throwing an error if the token is invalid or expired.
```
decode(token):DecodedJwt
```
3. *validate()*: Checks the validity of a JWT token, including its signature and expiration time, returning a boolean indicating whether the token is currently valid and usable.
```
validate(token):boolean
```
## Contributers

- [Sugam Kuber](https://www.linkedin.com/in/sugamkuber/)