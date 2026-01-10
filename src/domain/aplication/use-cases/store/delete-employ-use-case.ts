import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import { employeeRepository } from '../../repositories/employee-repository';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteEmployRequest {
  id: string; // id from user
}

type DeleteEmployResponse = Either<NotAllowedError | ResourceNotFoundError, {}>;
@Injectable()
export class DeleteEmployUseCase {
  constructor(
    @Inject(employAprovedRepository)
    private employRepository: employAprovedRepository,
    @Inject(employeeRepository) private requestEmploy: employeeRepository,
  ) {}
  async execute({ id }: DeleteEmployRequest): Promise<DeleteEmployResponse> {
    const dataEmploy = await this.employRepository.findById(id);

    if (!dataEmploy) {
      return left(new ResourceNotFoundError());
    }

    await this.employRepository.delete(dataEmploy.id.toString());

    const dataEmployee = await this.requestEmploy.findByUserId(
      dataEmploy.userId,
    );

    await this.requestEmploy.delete(dataEmployee.id.toString());

    return right({});
  }
}
