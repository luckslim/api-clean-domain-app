import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Time, type TimeProps } from "@/domain/enterprise/time-entity";

export function MakeTime(override: Partial<TimeProps>, id?: UniqueEntityId) {
  const time = Time.create(
    {
      storeId: new UniqueEntityId().toString(),
      time: '07:00',
      createdAt: new Date(),
      ...override,
    },
    id
  );
  return time;
}
