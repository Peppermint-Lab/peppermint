// utils/oauthClients.js

const { AuthorizationCode } = require("simple-oauth2");

const oauthClients: any = {};

function getOAuthClient(providerConfig: any) {
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

module.exports = getOAuthClient;
