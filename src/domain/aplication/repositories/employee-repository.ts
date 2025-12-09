import type { Employee } from "@/domain/enterprise/employee-store-entity";

export interface employeeRepository {
  create(employee: Employee): Promise<Employee>;
  findById(id: string): Promise<Employee | null>;
  findByUserId(id: string): Promise<Employee | null>;
  findByStoreId(id: string | undefined): Promise<Employee[] | null>;
  delete(id: string): Promise<void>;
}
