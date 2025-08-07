export interface EmailConfig {
  user: string;
  host: string;
  port: number;
  tls: boolean;
  tlsOptions: {
    rejectUnauthorized: boolean;
    servername: string;
  };
  xoauth2?: string;
  password?: string;
}

export type EmailQueue = {
  serviceType: "gmail" | "other";
  id: string;
  username: string;
  hostname: string;
  password?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
  accessToken?: string;
  expiresIn?: number;
  tls?: boolean;
};
