// functions for easily finding relevant auth methods

import { prisma } from "../prisma";

export async function getOidcConfig() {
  const config = await prisma.openIdConfig.findFirst();
  if (!config) {
    throw new Error("Config not found in the database");
  }
  return config;
}

export async function getOAuthProvider() {
  const provider = await prisma.oAuthProvider.findFirst();
  if (!provider) {
    throw new Error(`OAuth provider ${provider} not found`);
  }
  return provider;
}

export async function getSAMLProvider(providerName: any) {
  const provider = await prisma.sAMLProvider.findUnique({
    where: { name: providerName },
  });
  if (!provider) {
    throw new Error(`SAML provider ${providerName} not found`);
  }
  return provider;
}
