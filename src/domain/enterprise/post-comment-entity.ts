import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface PostCommentProps {
  postId: UniqueEntityId;
  userId: UniqueEntityId;
  content: string;
  createdAt: Date;
}

export class PostComment extends Entity<PostCommentProps> {
  get userId() {
    return this.props.userId;
  }

  get postId() {
    return this.props.postId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: PostCommentProps, id?: UniqueEntityId) {
    const postcomment = new PostComment(props, id);
    return postcomment;
  }
}
