import { GoogleAuth } from 'google-auth-library';
import { prisma } from '../../prisma';
import { EmailQueue } from '../types/email';

export class AuthService {
  public static generateXOAuth2Token(username: string, accessToken: string): string {
    const authString = [
      `user=${username}`,
      `auth=Bearer ${accessToken}`,
      '',
      ''
    ].join('\x01');
    return Buffer.from(authString).toString('base64');
  }

  static async getValidAccessToken(queue: EmailQueue): Promise<string> {
    const { clientId, clientSecret, refreshToken, accessToken, expiresIn } = queue;

    const now = Math.floor(Date.now() / 1000);
    if (accessToken && expiresIn && now < expiresIn) {
      return accessToken;
    }

    const auth = new GoogleAuth({
      clientOptions: { clientId, clientSecret }
    });

    const oauth2Client = auth.fromJSON({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    });

    const tokenInfo = await oauth2Client.getAccessToken();
    if (!tokenInfo.token) {
      throw new Error('Unable to refresh access token.');
    }

    const expiryDate = (expiresIn || 0) + 3600;
    await prisma.emailQueue.update({
      where: { id: queue.id },
      data: {
        accessToken: tokenInfo.token,
        expiresIn: expiryDate
      }
    });

    return tokenInfo.token;
  }
} 