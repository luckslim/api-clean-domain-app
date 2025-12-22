import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

interface PostProps {
  userId: UniqueEntityId;
  file: UniqueEntityId;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}

export class Post extends Entity<PostProps> {
  get userId() {
    return this.props.userId;
  }

  get file() {
    return this.props.file;
  }

  get content() {
    return this.props.content;
  }

  get likeCount() {
    return this.props.likeCount;
  }

  get commentCount() {
    return this.props.commentCount;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<PostProps, 'likeCount' | 'commentCount'>,
    id?: UniqueEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        commentCount: props.commentCount ?? 0,
        likeCount: props.likeCount ?? 0,
      },
      id,
    );
    return post;
  }
}
