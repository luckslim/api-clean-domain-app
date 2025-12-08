import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { userRepository } from "@/domain/aplication/repositories/user-repository";
import type { User } from "@/domain/enterprise/user-entity";

export class InMemoryUserRepository implements userRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = this.items.find((item) => item.userName === userName);
    if (!user) {
      return null;
    }
    return user;
  }

  async findById(id: UniqueEntityId): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async save(user: User): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);
    this.items[itemIndex] = user;
    return user;
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    this.items.splice(itemIndex, 1);
  }
}
