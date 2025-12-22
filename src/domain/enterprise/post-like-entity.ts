import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface PostLikedProps {
  postId: UniqueEntityId;
  userId: UniqueEntityId;
  createdAt: Date;
}

export class PostLiked extends Entity<PostLikedProps> {
  get userId() {
    return this.props.userId;
  }

  get postId() {
    return this.props.postId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: PostLikedProps, id?: UniqueEntityId) {
    const postliked = new PostLiked(props, id);
    return postliked;
  }
}
