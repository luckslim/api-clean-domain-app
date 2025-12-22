import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Employee,
  type EmployProps,
} from '@/domain/enterprise/employee-store-entity';

export function MakeEmploy(
  override: Partial<EmployProps>,
  id?: UniqueEntityId,
) {
  const employ = Employee.create(
    {
      storeId: new UniqueEntityId().toString(),
      employeeId: new UniqueEntityId().toString(),
      status: 'pending',
      typeUser: 'user',
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return employ;
}
