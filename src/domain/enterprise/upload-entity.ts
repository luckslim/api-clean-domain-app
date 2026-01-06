import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface UploadProps {
  userId: string;
  fileName: string;
  body: Buffer;
}

export class Upload extends Entity<UploadProps> {
  get userId() {
    return this.props.userId;
  }

  get fileName() {
    return this.props.fileName;
  }

  get body() {
    return this.props.body;
  }

  set fileName(fileName: string) {
    this.props.fileName = fileName;
  }

  static create(props: UploadProps, id?: UniqueEntityId) {
    const upload = new Upload(props, id);
    return upload;
  }
}
