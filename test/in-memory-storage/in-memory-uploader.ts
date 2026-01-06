import type { Uploader } from '@/domain/aplication/storage/uploader';
import type { Upload } from '@/domain/enterprise/upload-entity';

export class InMemoryUploaderStorage implements Uploader {
  public uploads: Upload[] = [];

  async upload(upload: Upload): Promise<{ result: string }> {
    this.uploads.push(upload);
    return { result: upload.fileName };
  }
  async deleteUpload(id: string): Promise<void> {
    const itemIndex = this.uploads.findIndex(
      (item) => item.id.toString() === id,
    );
    this.uploads.splice(itemIndex, 1);
  }
  async getSignedImageURL(id: string): Promise<string> {
    const { fileName } = this.uploads.find((item) => item.fileName == id);
    return fileName;
  }
}
