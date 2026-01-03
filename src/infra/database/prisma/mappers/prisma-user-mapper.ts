import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/enterprise/user-entity';
import type { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        userName: raw.userName,
        typeUser: raw.typeUser,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id.toString(),
      name: user.name,
      userName: user.userName,
      typeUser: user.typeUser,
      email: user.email,
      password: user.password,
    };
  }
}
