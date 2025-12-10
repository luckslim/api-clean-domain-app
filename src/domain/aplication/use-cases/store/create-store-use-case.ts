import { left, right, type Either } from "@/core/either";
import type { userRepository } from "../../repositories/user-repository";
import { Store } from "@/domain/enterprise/store-entity";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { storeRepository } from "../../repositories/store-repository";

interface CreateStoreRequest {
  creatorId: string;
  storeName: string;
  city: string;
  longitude: number;
  latitude: number;
}

type CreateStoreResponse = Either<NotAllowedError, { store: Store }>;

export class CreateStoreUseCase {
  constructor(
    private userRepository: userRepository,
    private storeRepository: storeRepository
  ) {}
  async execute({
    creatorId,
    storeName,
    city,
    longitude,
    latitude,
  }: CreateStoreRequest): Promise<CreateStoreResponse> {
    const user = await this.userRepository.findById(creatorId);

    if (!user) {
      return left(new NotAllowedError());
    }

    if (user.typeUser !== "creatorStore") {
      return left(new NotAllowedError());
    }

    const storeNameExisting = await this.storeRepository.findByStoreName(
      storeName
    );

    if (storeNameExisting) {
      return left(new NotAllowedError());
    }

    const data = Store.create({
      creatorId: user.id.toString(),
      storeName,
      city,
      longitude,
      latitude,
      createdAt: new Date(),
    });

    const store = await this.storeRepository.create(data);

    return right({ store });
  }
}
