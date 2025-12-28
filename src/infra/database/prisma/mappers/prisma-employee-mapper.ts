import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Employee } from '@/domain/enterprise/employee-store-entity';
import type { Employee as PrismaEmployee } from '@prisma/client';

export class PrismaEmployeeMapper {
  static toDomain(raw: PrismaEmployee): Employee {
    return Employee.create(
      {
        storeId: raw.storeId,
        employeeId: raw.userId,
        typeUser: raw.typeUser,
        status: raw.status,
        createdAt: raw.CreatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(employee: Employee): PrismaEmployee {
    return {
      id: employee.id.toString(),
      typeUser: employee.typeUser,
      storeId: employee.storeId,
      userId: employee.employeeId,
      status: employee.status,
      CreatedAt: employee.createdAt,
    };
  }
}
