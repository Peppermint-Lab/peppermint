import { GoogleAuth } from "google-auth-library";
import { prisma } from "../../prisma";
import { EmailQueue } from "../types/email";

export class AuthService {
  public static generateXOAuth2Token(
    username: string,
    accessToken: string
  ): string {
    const authString = [
      `user=${username}`,
      `auth=Bearer ${accessToken}`,
      "",
      "",
    ].join("\x01");
    return Buffer.from(authString).toString("base64");
  }

  static async getValidAccessToken(queue: EmailQueue): Promise<string> {
    const { clientId, clientSecret, refreshToken, accessToken, expiresIn } =
      queue;

    // Check if token is still valid
    const now = Math.floor(Date.now() / 1000);
    if (accessToken && expiresIn && now < expiresIn) {
      return accessToken;
    }

    // Initialize GoogleAuth client
    const auth = new GoogleAuth({
      clientOptions: {
        clientId: clientId,
        clientSecret: clientSecret,
      },
    });

    const oauth2Client = auth.fromJSON({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    });

    // Refresh the token if expired
    const tokenInfo = await oauth2Client.getAccessToken();

    const expiryDate = expiresIn! + 3600;

    if (tokenInfo.token) {
      await prisma.emailQueue.update({
        where: { id: queue.id },
        data: {
          accessToken: tokenInfo.token,
          expiresIn: expiryDate,
        },
      });

      return tokenInfo.token;
    } else {
      throw new Error("Unable to refresh access token.");
    }
  }
}
