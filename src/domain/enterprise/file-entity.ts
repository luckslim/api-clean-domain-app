import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface FileProps {
  userId: string;
  userName: string;
  fileName: string;
}

export class File extends Entity<FileProps> {
  get userId() {
    return this.props.userId;
  }

  get fileName() {
    return this.props.fileName;
  }

  get userName() {
    return this.props.userName;
  }

  set fileName(fileName: string) {
    this.props.fileName = fileName;
  }

  static create(props: FileProps, id?: UniqueEntityId) {
    const file = new File(props, id);
    return file;
  }
}
