import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User, type UserProps } from '@/domain/enterprise/user-entity';
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function MakeUser(override: Partial<UserProps>, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.word.noun(),
      userName: faker.word.noun(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      typeUser: 'user',
      ...override,
    },
    id,
  );
  return user;
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaUser(data: Partial<UserProps>): Promise<User> {
    const user = MakeUser(data);
    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });
    return user;
  }
}
