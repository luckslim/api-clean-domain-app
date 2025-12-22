import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Employ } from '@/domain/enterprise/employ-entity';
import type { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import type { DisponibilityTypeProps } from '@/core/types/type-disponibility';

interface DefineDisponibilityEmployRequest {
  id: string; // id from user
  disponibility: DisponibilityTypeProps;
}

type DefineDisponibilityEmployResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { employ: Employ }
>;

export class DefineDisponibilityEmployUseCase {
  constructor(private employRepository: employAprovedRepository) {}
  async execute({
    id,
    disponibility,
  }: DefineDisponibilityEmployRequest): Promise<DefineDisponibilityEmployResponse> {
    const employ = await this.employRepository.findById(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    employ.disponibility = disponibility;

    return right({ employ: employ });
  }
}
