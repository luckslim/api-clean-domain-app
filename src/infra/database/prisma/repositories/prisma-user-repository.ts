import { userRepository } from '@/domain/aplication/repositories/user-repository';
import { User } from '@/domain/enterprise/user-entity';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements userRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    console.log(user);
    const data = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!data) {
      return null;
    }

    const user = PrismaUserMapper.toDomain(data);

    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: { userName },
    });
    if (!data) {
      return null;
    }
    return PrismaUserMapper.toDomain(data);
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });
    const user = PrismaUserMapper.toDomain(data);
    return user;
  }

  async save(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: { id: data.id },
      data,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
