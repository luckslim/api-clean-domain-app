import { left, right, type Either } from '@/core/either';
import type { Employee } from '@/domain/enterprise/employee-store-entity';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { employeeRepository } from '../../repositories/employee-repository';
import { storeRepository } from '../../repositories/store-repository';
import { Inject, Injectable } from '@nestjs/common';

interface RequestFromEmployRequest {
  id: string; // id from user
}

type RequestFromEmployResponse = Either<
  ResourceNotFoundError,
  { employ: Employee[] }
>;
@Injectable()
export class RequestFromEmployUseCase {
  constructor(
    @Inject(employeeRepository) private employRepository: employeeRepository,
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({
    id,
  }: RequestFromEmployRequest): Promise<RequestFromEmployResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }
    const employ = await this.employRepository.findByStoreId(
      store.id.toString(),
    );

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    return right({ employ });
  }
}
