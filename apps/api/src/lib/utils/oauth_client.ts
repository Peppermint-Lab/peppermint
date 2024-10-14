// utils/oauthClients.js
//@ts-nocheck

const { AuthorizationCode } = require('simple-oauth2');

const oauthClients = {};

export function getOAuthClient(providerConfig: any) {
  const { name } = providerConfig;
  if (!oauthClients[name]) {
    oauthClients[name] = new AuthorizationCode({
      client: {
        id: providerConfig.clientId,
        secret: providerConfig.clientSecret,
      },
      auth: {
        tokenHost: providerConfig.tokenUrl,
        authorizeHost: providerConfig.authorizationUrl,
      },
    });
  }
  return oauthClients[name];
}

