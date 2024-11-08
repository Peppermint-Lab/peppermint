// utils/oidcClient.js

import { Issuer } from "openid-client";

let oidcClient: any = null;

export async function getOidcClient(config: any) {
  if (!oidcClient) {
    const oidcIssuer = await Issuer.discover(config.issuer);
    oidcClient = new oidcIssuer.Client({
      client_id: config.clientId,
      redirect_uris: [config.redirectUri],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    });
  }
  return oidcClient;
}
