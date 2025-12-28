import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Employ } from '@/domain/enterprise/employ-entity';
import type { Employ as PrismaEmploy } from '@prisma/client';

export class PrismaEmployMapper {
  static toDomain(raw: PrismaEmploy): Employ {
    return Employ.create(
      {
        storeId: raw.storeId,
        userId: raw.userId,
        disponibility: raw.disponibility,
        score: raw.score,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(employ: Employ): PrismaEmploy {
    return {
      id: employ.id.toString(),
      storeId: employ.storeId,
      userId: employ.userId,
      score: employ.score,
      disponibility: employ.disponibility,
      createdAt: employ.createdAt,
    };
  }
}
