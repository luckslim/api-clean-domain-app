import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { storeRepository } from "../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { Store } from "@/domain/enterprise/store-entity";

interface GetStoreRequest {
  id: string; // id from store
  creatorId: string;
}

type GetStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;

export class GetStoreUseCase {
  constructor(private storeRepository: storeRepository) {}
  async execute({ id, creatorId }: GetStoreRequest): Promise<GetStoreResponse> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      return left(new ResourceNotFoundError());
    }
    if (store.creatorId !== creatorId) {
      return left(new NotAllowedError());
    }
    
    return right({ store: store });
  }
}
