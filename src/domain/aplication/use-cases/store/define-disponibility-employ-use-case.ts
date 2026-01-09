import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Employ } from '@/domain/enterprise/employ-entity';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import type { DisponibilityTypeProps } from '@/core/types/type-disponibility';
import { Inject, Injectable } from '@nestjs/common';

interface DefineDisponibilityEmployRequest {
  id: string; // id from employ
  disponibility: DisponibilityTypeProps;
}

type DefineDisponibilityEmployResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { employ: Employ }
>;
@Injectable()
export class DefineDisponibilityEmployUseCase {
  constructor(
    @Inject(employAprovedRepository)
    private employRepository: employAprovedRepository,
  ) {}
  async execute({
    id,
    disponibility,
  }: DefineDisponibilityEmployRequest): Promise<DefineDisponibilityEmployResponse> {
    const employ = await this.employRepository.findById(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    employ.disponibility = disponibility;

    await this.employRepository.update(employ);

    return right({ employ: employ });
  }
}
