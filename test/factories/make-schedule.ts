import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Schedule,
  type ScheduleProps,
} from '@/domain/enterprise/schedules-entity';

export function MakeSchedule(
  override: Partial<ScheduleProps>,
  id?: UniqueEntityId,
) {
  const schedule = Schedule.create(
    {
      storeId: new UniqueEntityId().toString(),
      employId: new UniqueEntityId().toString(),
      service: 'tesoura',
      price: 40,
      typePayment: 'credit',
      time: '07:00',
      day: 'quinta',
      date: '22/09/2025',
      ...override,
    },
    id,
  );
  return schedule;
}
