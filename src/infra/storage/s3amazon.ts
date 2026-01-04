import { Uploader } from '@/domain/aplication/storage/uploader';
import { Upload } from '@/domain/enterprise/upload-entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { EnvService } from '../env/env.service';
import { Injectable } from '@nestjs/common';

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
    const key = `users/${upload.userId}/${upload.fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.envService.get('BUCKET_NAME'),
      Key: key,
      Body: upload.body,
      ContentType: 'image/jpeg', // ou image/png
    });

    await this.client.send(command);

    return { result: upload.fileName };
  }
  deleteUpload(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
