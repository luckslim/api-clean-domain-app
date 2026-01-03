import { scheduleRepository } from '@/domain/aplication/repositories/schedule-repository';
import { Schedule } from '@/domain/enterprise/schedules-entity';
import { PrismaService } from '../prisma.service';
import { PrismaSchedulesMapper } from '../mappers/prisma-schedule-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaScheduleRepository implements scheduleRepository {
  constructor(private prisma: PrismaService) {}

  async create(schedule: Schedule): Promise<Schedule> {
    const data = PrismaSchedulesMapper.toPrisma(schedule);
    await this.prisma.schedules.create({
      data,
    });
    return schedule;
  }

  async findById(id: string): Promise<Schedule | null> {
    const data = await this.prisma.schedules.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return PrismaSchedulesMapper.toDomain(data);
  }

  async findManyByUserId(id: string): Promise<Schedule[] | null> {
    const data = await this.prisma.schedules.findMany({
      where: {
        userId: id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaSchedulesMapper.toDomain(item));
  }

  async findManyByEmployId(id: string): Promise<Schedule[] | null> {
    const data = await this.prisma.schedules.findMany({
      where: {
        employId: id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaSchedulesMapper.toDomain(item));
  }

  async findByUserId(id: string): Promise<Schedule | null> {
    const data = await this.prisma.schedules.findFirst({
      where: {
        userId: id,
      },
    });
    if (!data) {
      return null;
    }
    return PrismaSchedulesMapper.toDomain(data);
  }

  async findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null> {
    const data = await this.prisma.schedules.findMany({
      where: {
        storeId: id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaSchedulesMapper.toDomain(item));
  }

  async findByDate(date: string): Promise<Schedule[] | null> {
    const data = await this.prisma.schedules.findMany({
      where: {
        date,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaSchedulesMapper.toDomain(item));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.schedules.delete({
      where: { id },
    });
  }

  async deleteManyByUserId(id: string): Promise<void> {
    await this.prisma.schedules.deleteMany({
      where: { userId: id },
    });
  }
}
