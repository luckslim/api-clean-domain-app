import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Employ } from '@/domain/enterprise/employ-entity';
import type { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import type { employeeRepository } from '../../repositories/employee-repository';

interface DeleteEmployRequest {
  id: string; // id from user
}

type DeleteEmployResponse = Either<NotAllowedError | ResourceNotFoundError, {}>;

export class DeleteEmployUseCase {
  constructor(
    private employRepository: employAprovedRepository,
    private requestEmploy: employeeRepository,
  ) {}
  async execute({ id }: DeleteEmployRequest): Promise<DeleteEmployResponse> {
    const data = await this.employRepository.findById(id);

    if (!data) {
      return left(new ResourceNotFoundError());
    }

    await this.employRepository.delete(data.id.toString());

    await this.requestEmploy.delete(data.id.toString());

    return right({});
  }
}
