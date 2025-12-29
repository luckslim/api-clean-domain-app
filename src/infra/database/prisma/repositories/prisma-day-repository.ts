import { dayRepository } from '@/domain/aplication/repositories/day-repository';
import { Day } from '@/domain/enterprise/day-entity';
import { PrismaService } from '../prisma.service';
import { PrismaDayMapper } from '../mappers/prisma-day-mapper';

export class PrismaDayRepository implements dayRepository {
  constructor(private prisma: PrismaService) {}

  async create(day: Day): Promise<Day> {
    const data = PrismaDayMapper.toPrisma(day);
    await this.prisma.day.create({
      data,
    });
    return day;
  }

  async findById(id: string): Promise<Day | null> {
    const data = await this.prisma.day.findUnique({
      where: {
        id,
      },
    });
    return PrismaDayMapper.toDomain(data);
  }

  async findManyById(id: string): Promise<Day[] | null> {
    const data = await this.prisma.day.findMany({
      where: {
        id,
      },
    });
    return data.map((item) => PrismaDayMapper.toDomain(item));
  }

  async findByStoreId(id: string): Promise<Day | null> {
    const data = await this.prisma.day.findFirst({
      where: {
        id,
      },
    });
    return PrismaDayMapper.toDomain(data);
  }

  async findManyByStoreId(id: string): Promise<Day[] | null> {
    const data = await this.prisma.day.findMany({
      where: {
        id,
      },
    });
    return data.map((item) => PrismaDayMapper.toDomain(item));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.day.delete({
      where: {
        id,
      },
    });
  }

  async deleteManyByStoreId(id: string): Promise<void> {
    await this.prisma.day.deleteMany({
      where: {
        storeId: id,
      },
    });
  }
}
