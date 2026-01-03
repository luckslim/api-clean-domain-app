import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Time, type TimeProps } from '@/domain/enterprise/time-entity';
import { PrismaTimeMapper } from '@/infra/database/prisma/mappers/prisma-time-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function MakeTime(override: Partial<TimeProps>, id?: UniqueEntityId) {
  const time = Time.create(
    {
      storeId: new UniqueEntityId().toString(),
      time: '07:00',
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return time;
}

@Injectable()
export class TimeFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaTime(data: Partial<TimeProps>): Promise<Time> {
    const time = MakeTime(data);
    await this.prisma.time.create({
      data: PrismaTimeMapper.toPrisma(time),
    });
    return time;
  }
}
