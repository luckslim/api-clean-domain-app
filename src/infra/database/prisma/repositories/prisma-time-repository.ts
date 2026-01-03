import { timeRepository } from '@/domain/aplication/repositories/time-repository';
import { Time } from '@/domain/enterprise/time-entity';
import { PrismaService } from '../prisma.service';
import { PrismaTimeMapper } from '../mappers/prisma-time-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTimeRepository implements timeRepository {
  constructor(private prisma: PrismaService) {}

  async create(time: Time): Promise<Time> {
    const data = PrismaTimeMapper.toPrisma(time);
    await this.prisma.time.create({
      data,
    });
    return time;
  }

  async findById(id: string): Promise<Time | null> {
    const data = await this.prisma.time.findUnique({
      where: {
        id,
      },
    });
    return PrismaTimeMapper.toDomain(data);
  }

  async findManyById(id: string): Promise<Time[] | null> {
    const data = await this.prisma.time.findMany({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaTimeMapper.toDomain(item));
  }

  async findByStoreId(id: string): Promise<Time | null> {
    const data = await this.prisma.time.findFirst({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return PrismaTimeMapper.toDomain(data);
  }

  async findManyByStoreId(id: string): Promise<Time[] | null> {
    const data = await this.prisma.time.findMany({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaTimeMapper.toDomain(item));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.time.delete({
      where: {
        id,
      },
    });
  }

  async deleteManyByStoreId(id: string): Promise<void> {
    await this.prisma.time.deleteMany({
      where: {
        storeId: id,
      },
    });
  }
}
