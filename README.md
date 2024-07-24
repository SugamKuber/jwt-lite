# jwt-lite

```
npm i jwt-lite-2024
```
jwt-lite is a lightweight npm library for handling JWT tokens in JavaScript and TypeScript applications. It provides simple methods for encoding, decoding, and validating JWT tokens with a focus on ease of use.

---

### [NPM LINK](https://www.npmjs.com/package/jwt-lite-2024)
- The above source code is in "main" branch
### [DEMO LINK](https://jwt-lite.vercel.app/)
- The above source code is in "demo" branch

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

---

Made with  ♥ by [Sugam Kuber](https://www.linkedin.com/in/sugamkuber/)

