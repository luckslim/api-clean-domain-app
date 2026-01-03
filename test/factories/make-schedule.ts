import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Schedule,
  type ScheduleProps,
} from '@/domain/enterprise/schedules-entity';
import { PrismaSchedulesMapper } from '@/infra/database/prisma/mappers/prisma-schedule-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function MakeSchedule(
  override: Partial<ScheduleProps>,
  id?: UniqueEntityId,
) {
  const schedule = Schedule.create(
    {
      storeId: new UniqueEntityId().toString(),
      employId: new UniqueEntityId().toString(),
      userId: new UniqueEntityId().toString(),
      service: 'tesoura',
      price: 40,
      typePayment: 'credit',
      time: '07:00',
      date: '22/09/2025',
      ...override,
    },
    id,
  );
  return schedule;
}

@Injectable()
export class ScheduleFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaSchedule(data: Partial<ScheduleProps>): Promise<Schedule> {
    const schedule = MakeSchedule(data);
    await this.prisma.schedules.create({
      data: PrismaSchedulesMapper.toPrisma(schedule),
    });
    return schedule;
  }
}
