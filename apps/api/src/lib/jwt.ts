import jwt from "jsonwebtoken";

export function checkToken(token: string) {
  const bearer = token;

  var b64string = "TOMATOSOUP";
  var buf = new Buffer(b64string, "base64"); // Ta-da

  const verified = jwt.verify(bearer, buf);

  return verified;
}
