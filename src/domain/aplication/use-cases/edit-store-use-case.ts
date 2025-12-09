import { left, right, type Either } from "@/core/either";
import type { userRepository } from "../repositories/user-repository";
import { Store } from "@/domain/enterprise/store-entity";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { storeRepository } from "../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface EditStoreRequest {
  id: string; // id from store
  creatorId: string;
  storeName: string;
  city: string;
  longitude: number;
  latitude: number;
}

type EditStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;

export class EditStoreUseCase {
  constructor(
    private storeRepository: storeRepository
  ) {}
  async execute({
    id,
    creatorId,
    storeName,
    city,
    longitude,
    latitude,
  }: EditStoreRequest): Promise<EditStoreResponse> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    if (store.creatorId.toString() !== creatorId) {
      return left(new NotAllowedError());
    }

    store.storeName = storeName;
    store.city = city;
    store.longitude = longitude;
    store.latitude = latitude;

    return right({ store });
  }
}
