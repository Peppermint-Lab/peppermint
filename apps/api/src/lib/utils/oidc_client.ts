// utils/oidcClient.js

const { Issuer } = require('openid-client');

let oidcClient: any = null;

async function getOidcClient(config: any) {
  if (!oidcClient) {
    const oidcIssuer = await Issuer.discover(config.issuer);
    oidcClient = new oidcIssuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uris: [config.redirectUri],
      response_types: ['code'],
    });
  }
  return oidcClient;
}

module.exports = getOidcClient;
