import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Employ, type EmployProps } from "@/domain/enterprise/employ-entity";

export function MakeEmployAproved(
  override: Partial<EmployProps>,
  id?: UniqueEntityId
) {
  const employ = Employ.create(
    {
      storeId: new UniqueEntityId().toString(),
      userId: new UniqueEntityId().toString(),
      disponibility: 'indisponible',
      score: 0,
      createdAt: new Date(),
      ...override,
    },
    id
  );
  return employ;
}
