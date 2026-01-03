import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Day, type DayProps } from '@/domain/enterprise/day-entity';
import { PrismaDayMapper } from '@/infra/database/prisma/mappers/prisma-day-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function MakeDay(override: Partial<DayProps>, id?: UniqueEntityId) {
  const day = Day.create(
    {
      storeId: new UniqueEntityId().toString(),
      day: 'segunda',
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return day;
}

@Injectable()
export class DayFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaDay(data: Partial<DayProps>): Promise<Day> {
    const day = MakeDay(data);
    await this.prisma.day.create({
      data: PrismaDayMapper.toPrisma(day),
    });
    return day;
  }
}
