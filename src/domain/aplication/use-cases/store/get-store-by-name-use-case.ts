import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { storeRepository } from "../../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { Store } from "@/domain/enterprise/store-entity";

interface GetStoreByNameRequest {
  storeName: string;
}

type GetStoreByNameResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;

export class GetStoreByNameUseCase {
  constructor(private storeRepository: storeRepository) {}
  async execute({
    storeName,
  }: GetStoreByNameRequest): Promise<GetStoreByNameResponse> {
    const store = await this.storeRepository.findByStoreName(storeName);
    if (!store) {
      return left(new ResourceNotFoundError());
    }
    return right({ store: store });
  }
}
