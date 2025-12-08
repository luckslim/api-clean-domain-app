import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface UserProps {
  fileName: string;
  url: string;
}

export class File extends Entity<UserProps> {
  get fileName() {
    return this.props.fileName;
  }
  
  get url() {
    return this.props.url;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const file = new File(props, id);
    return file;
  }
}
