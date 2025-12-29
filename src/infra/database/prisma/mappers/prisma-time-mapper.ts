import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Time } from '@/domain/enterprise/time-entity';
import type { Time as PrismaTime } from '@prisma/client';

export class PrismaTimeMapper {
  static toDomain(raw: PrismaTime): Time {
    return Time.create(
      {
        storeId: raw.storeId,
        time: raw.time,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(time: Time): PrismaTime {
    return {
      id: time.id.toString(),
      storeId: time.storeId,
      time: time.time,
      createdAt: time.createdAt,
    };
  }
}
