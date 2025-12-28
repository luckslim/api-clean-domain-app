import { storeRepository } from '@/domain/aplication/repositories/store-repository';
import { Store } from '@/domain/enterprise/store-entity';
import { PrismaService } from '../prisma.service';
import { PrismaStoreMapper } from '../mappers/prisma-store-mapper';

export class PrismaStoreRepository implements storeRepository {
  constructor(private prisma: PrismaService) {}

  async create(store: Store): Promise<Store> {
    const data = PrismaStoreMapper.toPrisma(store);
    await this.prisma.store.create({
      data,
    });
    return store;
  }

  async findByStoreName(storeName: string | undefined): Promise<Store | null> {
    const data = await this.prisma.store.findFirst({
      where: {
        storeName,
      },
    });
    return PrismaStoreMapper.toDomain(data);
  }

  async findById(id: string): Promise<Store | null> {
    const data = await this.prisma.store.findUnique({
      where: {
        id,
      },
    });
    return PrismaStoreMapper.toDomain(data);
  }

  async findByUserId(id: string): Promise<Store | null> {
    const data = await this.prisma.store.findFirst({
      where: {
        creatorId: id,
      },
    });
    return PrismaStoreMapper.toDomain(data);
  }

  async save(store: Store): Promise<Store> {
    const data = PrismaStoreMapper.toPrisma(store);
    await this.prisma.store.update({
      where: {
        id: data.id,
      },
      data,
    });
    return PrismaStoreMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.store.delete({
      where: {
        id,
      },
    });
  }
}
