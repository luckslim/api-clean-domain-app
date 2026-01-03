import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Employee,
  type EmployProps,
} from '@/domain/enterprise/employee-store-entity';
import { PrismaEmployeeMapper } from '@/infra/database/prisma/mappers/prisma-employee-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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

@Injectable()
export class EmployeeFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaEmployee(data: Partial<EmployProps>): Promise<Employee> {
    const employee = MakeEmploy(data);
    await this.prisma.employee.create({
      data: PrismaEmployeeMapper.toPrisma(employee),
    });
    return employee;
  }
}
