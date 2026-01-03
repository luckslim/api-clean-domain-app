import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Employ, type EmployProps } from '@/domain/enterprise/employ-entity';
import { PrismaEmployMapper } from '@/infra/database/prisma/mappers/prisma-employ-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function MakeEmployAproved(
  override: Partial<EmployProps>,
  id?: UniqueEntityId,
) {
  const employ = Employ.create(
    {
      storeId: new UniqueEntityId().toString(),
      userId: new UniqueEntityId().toString(),
      disponibility: 'indisponible',
      score: 0,
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return employ;
}

@Injectable()
export class EmployFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaEmploy(data: Partial<EmployProps>): Promise<Employ> {
    const employ = MakeEmployAproved(data);
    await this.prisma.employ.create({
      data: PrismaEmployMapper.toPrisma(employ),
    });
    return employ;
  }
}
