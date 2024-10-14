// utils/samlProviders.js

const { ServiceProvider, IdentityProvider } = require('samlify');

const samlProviders: any = {};

function getSamlProvider(providerConfig: any) {
  const { name } = providerConfig;
  if (!samlProviders[name]) {
    // Configure Service Provider (SP)
    const sp = ServiceProvider({
      entityID: providerConfig.issuer,
      assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: providerConfig.acsUrl,
      }],
    });

    // Configure Identity Provider (IdP)
    const idp = IdentityProvider({
      entityID: providerConfig.entryPoint,
      singleSignOnService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        Location: providerConfig.ssoLoginUrl,
      }],
      signingCert: providerConfig.cert,
    });

    samlProviders[name] = { sp, idp };
  }
  return samlProviders[name];
}

module.exports = getSamlProvider;
