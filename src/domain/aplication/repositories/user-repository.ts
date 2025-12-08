import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { User } from "@/domain/enterprise/user-entity";

export interface userRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  findById(id: UniqueEntityId): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: UniqueEntityId): Promise<void>;
}
