import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Day } from '@/domain/enterprise/day-entity';
import type { Day as PrismaDay } from '@prisma/client';

export class PrismaDayMapper {
  static toDomain(raw: PrismaDay): Day {
    return Day.create(
      {
        storeId: raw.storeId,
        day: raw.day,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(day: Day): PrismaDay {
    return {
      id: day.id.toString(),
      storeId: day.storeId,
      day: day.day,
      createdAt: day.createdAt,
    };
  }
}
