import type { Employee } from '@/domain/enterprise/employee-store-entity';

export abstract class employeeRepository {
  abstract create(employee: Employee): Promise<Employee>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract findByUserId(id: string): Promise<Employee | null>;
  abstract findByStoreId(id: string | undefined): Promise<Employee[] | null>;
  abstract delete(id: string): Promise<void>;
}
