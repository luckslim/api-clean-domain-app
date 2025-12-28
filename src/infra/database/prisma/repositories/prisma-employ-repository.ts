import { Employ } from '@/domain/enterprise/employ-entity';
import { PrismaService } from '../prisma.service';
import { employAprovedRepository } from '@/domain/aplication/repositories/employ-aproved-repository';
import { PrismaEmployMapper } from '../mappers/prisma-employ-mapper';

export class PrismaEmployRepository implements employAprovedRepository {
  constructor(public prisma: PrismaService) {}
  async create(employ: Employ): Promise<Employ> {
    const data = PrismaEmployMapper.toPrisma(employ);
    await this.prisma.employ.create({
      data,
    });
    return employ;
  }

  async findById(id: string): Promise<Employ | null> {
    const data = await this.prisma.employ.findUnique({
      where: {
        id,
      },
    });
    return PrismaEmployMapper.toDomain(data);
  }

  async findByUserId(id: string): Promise<Employ | null> {
    const data = await this.prisma.employ.findFirst({
      where: {
        userId: id,
      },
    });
    return PrismaEmployMapper.toDomain(data);
  }

  async findByStoreId(id: string | undefined): Promise<Employ[] | null> {
    const data = await this.prisma.employ.findMany({
      where: {
        storeId: id,
      },
    });
    return data.map((item) => PrismaEmployMapper.toDomain(item));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employ.delete({
      where: {
        id,
      },
    });
  }
}
