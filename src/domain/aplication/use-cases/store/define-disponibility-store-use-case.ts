import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { Store } from "@/domain/enterprise/store-entity";
import type { DisponibilityTypeProps } from "@/core/types/type-disponibility";
import type { storeRepository } from "../../repositories/store-repository";

interface DefineDisponibilityStoreRequest {
  id: string; // id from user
  disponibility: DisponibilityTypeProps;
}

type DefineDisponibilityStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;

export class DefineDisponibilityStoreUseCase {
  constructor(
    private storeRepository: storeRepository,
  ) {}
  async execute({
    id,
    disponibility,
  }: DefineDisponibilityStoreRequest): Promise<DefineDisponibilityStoreResponse> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    store.disponibility = disponibility;

    return right({ store: store });
  }
}
