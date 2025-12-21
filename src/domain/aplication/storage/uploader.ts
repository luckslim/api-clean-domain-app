import type { Upload } from '@/domain/enterprise/upload-entity';

export interface Uploader {
  upload(upload: Upload): Promise<{ url: string }>;
  deleteUpload(id: string): Promise<void>;
}
