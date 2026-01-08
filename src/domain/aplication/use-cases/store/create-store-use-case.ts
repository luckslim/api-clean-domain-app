import { left, right, type Either } from '@/core/either';
import { userRepository } from '../../repositories/user-repository';
import { Store } from '@/domain/enterprise/store-entity';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { storeRepository } from '../../repositories/store-repository';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import { Employ } from '@/domain/enterprise/employ-entity';
import { geographyRepository } from '../../repositories/geography-repository';
import { Geography } from '@/domain/enterprise/geography-entity';
import { Coordinates } from '@/core/entities/coordinates';
import { Inject, Injectable } from '@nestjs/common';

interface CreateStoreRequest {
  creatorId: string;
  storeName: string;
  city: string;
  longitude: number;
  latitude: number;
}

type CreateStoreResponse = Either<NotAllowedError, { store: Store }>;
@Injectable()
export class CreateStoreUseCase {
  constructor(
    @Inject(userRepository) private userRepository: userRepository,
    @Inject(storeRepository) private storeRepository: storeRepository,
    @Inject(geographyRepository)
    private geographyRepository: geographyRepository,
    @Inject(employAprovedRepository)
    private employRepository: employAprovedRepository,
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

    if (user.typeUser !== 'creatorStore') {
      return left(new NotAllowedError());
    }

    const storeNameExisting =
      await this.storeRepository.findByStoreName(storeName);

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

    const geo = Geography.create({
      storeId: store.id.toString(),
      coordinates: Coordinates.create({ latitude, longitude }),
    });

    await this.geographyRepository.create(geo);

    const employ = Employ.create({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      score: 0,
      disponibility: 'indisponible',
      createdAt: new Date(),
    });

    await this.employRepository.create(employ);

    return right({ store });
  }
}
