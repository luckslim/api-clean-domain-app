import { Uploader } from '@/domain/aplication/storage/uploader';
import { Upload } from '@/domain/enterprise/upload-entity';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { EnvService } from '../env/env.service';
import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Amazon implements Uploader {
  private client: S3Client;

  constructor(private envService: EnvService) {
    this.client = new S3Client({
      region: envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: envService.get('AWS_PUBLIC_KEY'),
        secretAccessKey: envService.get('AWS_SECRET_KEY'),
      },
    });
  }

  async upload(upload: Upload): Promise<{ result: string }> {
    const key = `${upload.fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.envService.get('BUCKET_NAME'),
      Key: key,
      Body: upload.body,
      ContentType: 'image/jpeg',
    });

    await this.client.send(command);

    return { result: upload.fileName };
  }

  async deleteUpload(id: string): Promise<void> {
    const input = {
      Bucket: this.envService.get('BUCKET_NAME'),
      Key: id,
    };
    const command = new DeleteObjectCommand(input);

    await this.client.send(command);
  }

  async getSignedImageURL(id: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.envService.get('BUCKET_NAME'),
      Key: id,
    });
    const url = await getSignedUrl(this.client, command, {
      expiresIn: 60 * 60 * 24, //  24 horas
    });

    return url;
  }
}
