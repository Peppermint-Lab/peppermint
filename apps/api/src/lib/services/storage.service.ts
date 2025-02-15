import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageConfig } from "@prisma/client";
import fs from "fs";
import path from "path";
import { prisma } from "../../prisma";

interface StorageProvider {
  upload(file: Express.Multer.File): Promise<string>;
  download(filePath: string): Promise<Buffer | ReadableStream>;
  delete(filePath: string): Promise<void>;
  getSignedUrl(filePath: string): Promise<string>;
}

class LocalStorageProvider implements StorageProvider {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
    // Ensure base directory exists
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(this.basePath, file.filename);
    // File is already moved by multer, just return the path
    return filePath;
  }

  async download(filePath: string): Promise<Buffer> {
    return fs.promises.readFile(filePath);
  }

  async delete(filePath: string): Promise<void> {
    await fs.promises.unlink(filePath);
  }

  async getSignedUrl(filePath: string): Promise<string> {
    // For local storage, we'll just return the direct path
    return `/api/v1/storage/download/${path.basename(filePath)}`;
  }
}

class S3StorageProvider implements StorageProvider {
  private client: S3Client;
  private bucket: string;
  private basePath: string;

  constructor(config: StorageConfig) {
    const clientConfig: any = {
      region: config.region || "us-east-1",
      credentials: {
        accessKeyId: config.accessKey!,
        secretAccessKey: config.secretKey!,
      },
      forcePathStyle: true, // Needed for MinIO and other S3-compatible services
    };

    if (config.endpoint) {
      clientConfig.endpoint = config.endpoint;
    }

    this.client = new S3Client(clientConfig);
    this.bucket = config.bucket!;
    this.basePath = config.basePath;
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = `${this.basePath}/${file.filename}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
    });

    await this.client.send(command);
    // Clean up local file after upload
    await fs.promises.unlink(file.path);
    return key;
  }

  async download(filePath: string): Promise<ReadableStream> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filePath,
    });

    const response = await this.client.send(command);
    return response.Body as ReadableStream;
  }

  async delete(filePath: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filePath,
    });

    await this.client.send(command);
  }

  async getSignedUrl(filePath: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filePath,
    });

    return getSignedUrl(this.client, command, { expiresIn: 3600 }); // URL expires in 1 hour
  }
}

export class StorageService {
  private static instance: StorageProvider | null = null;

  static async getProvider(): Promise<StorageProvider> {
    if (!this.instance) {
      const config = await prisma.storageConfig.findFirst({
        where: { active: true },
      });

      if (!config) {
        // Create default local storage config if none exists
        const defaultConfig = await prisma.storageConfig.create({
          data: {
            provider: "local",
            basePath: "uploads",
            active: true,
          },
        });
        
        this.instance = new LocalStorageProvider(defaultConfig.basePath);
      } else if (config.provider === "local") {
        this.instance = new LocalStorageProvider(config.basePath);
      } else if (config.provider === "s3") {
        this.instance = new S3StorageProvider(config);
      } else {
        throw new Error(`Unsupported storage provider: ${config.provider}`);
      }
    }

    return this.instance;
  }

  static async resetProvider(): Promise<void> {
    this.instance = null;
  }
} 