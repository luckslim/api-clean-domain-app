import { right, type Either } from "@/core/either";
import type { WrongCredentialError } from "@/core/errors/wrong-credentials-error";
import { Employ } from "@/domain/enterprise/employ-entity";
import type { DisponibilityTypeProps } from "@/core/types/type-disponibility";
import type { employAprovedRepository } from "../../repositories/employ-aproved-repository";

interface CreateEmployRequest {
  storeId: string | undefined;
  userId: string | undefined;
  disponibility: DisponibilityTypeProps;
  score: number;
}

type CreateEmployResponse = Either<WrongCredentialError, { employ: Employ }>;

export class CreateEmployUseCase {
  constructor(private employRepository: employAprovedRepository) {}
  async execute({
    storeId,
    userId,
    disponibility,
    score,
  }: CreateEmployRequest): Promise<CreateEmployResponse> {
    const data = Employ.create({
      storeId,
      userId,
      disponibility,
      score,
      createdAt: new Date(),
    });
    
    const employ = await this.employRepository.create(data);

    return right({ employ });
  }
}
