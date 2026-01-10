import type { employeeRepository } from '@/domain/aplication/repositories/employee-repository';
import type { Employee } from '@/domain/enterprise/employee-store-entity';

export class InMemoryEmployeeRepository implements employeeRepository {
  public items: Employee[] = [];

  async create(employee: Employee): Promise<Employee> {
    this.items.push(employee);
    return employee;
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id.toString() === id);
    if (!employee) {
      return null;
    }
    return employee;
  }
  async findByUserId(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.employeeId === id);
    if (!employee) {
      return null;
    }
    return employee;
  }

  async findByStoreId(id: string): Promise<Employee[] | null> {
    const employee = this.items.filter((items) => items.storeId === id);
    if (!employee) {
      return null;
    }
    return employee;
  }

  async update(employee: Employee): Promise<Employee> {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id);
    this.items[itemIndex] = employee;
    return employee;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
