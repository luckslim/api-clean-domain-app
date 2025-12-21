import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface FileProps {
  userId: string;
  fileName: string;
  url: string;
}

export class File extends Entity<FileProps> {
  get userId() {
    return this.props.userId;
  }

  get fileName() {
    return this.props.fileName;
  }

  get url() {
    return this.props.url;
  }
  set fileName(fileName: string) {
    this.props.fileName = fileName;
  }

  set url(url: string) {
    this.props.url = url;
  }

  static create(props: FileProps, id?: UniqueEntityId) {
    const file = new File(props, id);
    return file;
  }
}
