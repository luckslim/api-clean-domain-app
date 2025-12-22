import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Day, type DayProps } from '@/domain/enterprise/day-entity';

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
