import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Schedule } from '@/domain/enterprise/schedules-entity';
import type { Schedules as PrismaSchedules } from '@prisma/client';

export class PrismaSchedulesMapper {
  static toDomain(raw: PrismaSchedules): Schedule {
    return Schedule.create(
      {
        storeId: raw.storeId,
        employId: raw.employId,
        userId: raw.userId,
        service: raw.service,
        typePayment: raw.typePayment,
        price: raw.price,
        time: raw.timeId,
        date: raw.date,
        createdAt: raw.createdAt,
        modifiedAt: raw.modifiedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(schedule: Schedule): PrismaSchedules {
    return {
      id: schedule.id.toString(),
      storeId: schedule.storeId,
      employId: schedule.employId,
      userId: schedule.userId,
      service: schedule.service,
      typePayment: schedule.typePayment,
      price: schedule.price,
      timeId: schedule.time,
      date: schedule.date,
      createdAt: schedule.createdAt,
      modifiedAt: schedule.modifiedAt,
    };
  }
}
