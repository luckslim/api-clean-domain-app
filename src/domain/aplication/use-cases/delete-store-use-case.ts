import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { storeRepository } from "../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface DeleteStoreRequest {
  id: string; // id from store
  creatorId: string;
}

type DeleteStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;

export class DeleteStoreUseCase {
  constructor(private storeRepository: storeRepository,) {}
  async execute({
    id,
    creatorId,
  }: DeleteStoreRequest): Promise<DeleteStoreResponse> {
    const store = await this.storeRepository.findById(id);
    if(!store){
        return left(new ResourceNotFoundError())
    }
    if(store.creatorId !== creatorId){
        return left(new NotAllowedError())
    }
    this.storeRepository.delete(id)

    return right({})

  }
}
