import { fileRepository } from '@/domain/aplication/repositories/file-repository';
import { File } from '@/domain/enterprise/file-entity';
import { PrismaService } from '../prisma.service';
import { PrismaFileMapper } from '../mappers/prisma-file-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFileRepository implements fileRepository {
  constructor(private prisma: PrismaService) {}

  async create(file: File): Promise<File> {
    const data = PrismaFileMapper.toPrisma(file);
    await this.prisma.files.create({
      data,
    });

    return file;
  }

  async findById(id: string): Promise<File | null> {
    const data = await this.prisma.files.findUnique({
      where: { id },
    });
    if (!data) {
      return null;
    }
    return PrismaFileMapper.toDomain(data);
  }

  async findByUserId(id: string): Promise<File | null> {
    const data = await this.prisma.files.findFirst({
      where: {
        userId: id,
      },
    });
    if (!data) {
      return null;
    }
    return PrismaFileMapper.toDomain(data);
  }

  async findUrlByUserId(id: string): Promise<string | null> {
    const data = await this.prisma.files.findFirst({
      where: {
        userId: id,
      },
    });
    if (!data) {
      return null;
    }
    return data.userName;
  }

  async findByUserName(userName: string): Promise<File | null> {
    const data = await this.prisma.files.findFirst({
      where: {
        userName,
      },
    });
    return PrismaFileMapper.toDomain(data);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.files.delete({
      where: {
        id,
      },
    });
  }
}
