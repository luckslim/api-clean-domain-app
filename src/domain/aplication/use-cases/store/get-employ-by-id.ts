import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { Employ } from "@/domain/enterprise/employ-entity";
import type { employAprovedRepository } from "../../repositories/employ-aproved-repository";
import type { storeRepository } from "../../repositories/store-repository";

interface GetEmployRequest {
  id: string; // id from user
}

type GetEmployResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { employ: Employ[] }
>;

export class GetEmployUseCase {
  constructor(
    private employRepository: employAprovedRepository,
    private storeRepository: storeRepository
  ) {}
  async execute({ id }: GetEmployRequest): Promise<GetEmployResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    const employ = await this.employRepository.findByStoreId(
      store.id.toString()
    );

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    return right({ employ: employ });
  }
}
