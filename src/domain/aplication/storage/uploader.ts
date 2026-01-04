import type { Upload } from '@/domain/enterprise/upload-entity';

export abstract class Uploader {
  abstract upload(upload: Upload): Promise<{ result: string }>;
  abstract deleteUpload(id: string): Promise<void>;
}
