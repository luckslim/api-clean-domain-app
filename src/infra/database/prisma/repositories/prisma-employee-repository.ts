import { employeeRepository } from '@/domain/aplication/repositories/employee-repository';
import { Employee } from '@/domain/enterprise/employee-store-entity';
import { PrismaService } from '../prisma.service';
import { PrismaEmployeeMapper } from '../mappers/prisma-employee-mapper';

export class PrismaEmployeeRepository implements employeeRepository {
  constructor(public prisma: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    const data = PrismaEmployeeMapper.toPrisma(employee);
    await this.prisma.employee.create({
      data,
    });
    return employee;
  }

  async findById(id: string): Promise<Employee | null> {
    const data = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
    return PrismaEmployeeMapper.toDomain(data);
  }

  async findByUserId(id: string): Promise<Employee | null> {
    const data = await this.prisma.employee.findFirst({
      where: {
        userId: id,
      },
    });
    return PrismaEmployeeMapper.toDomain(data);
  }

  async findByStoreId(id: string | undefined): Promise<Employee[] | null> {
    const data = await this.prisma.employee.findMany({
      where: {
        storeId: id,
      },
    });
    return data.map((item) => PrismaEmployeeMapper.toDomain(item));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
