import { scheduleRepository } from '@/domain/aplication/repositories/schedule-repository';
import { Schedule } from '@/domain/enterprise/schedules-entity';
import { PrismaService } from '../prisma.service';

export class PrismaScheduleRepository implements scheduleRepository {
  constructor(private prisma: PrismaService) {}

  async create(schedule: Schedule): Promise<Schedule> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Schedule | null> {
    throw new Error('Method not implemented.');
  }
  async findManyByUserId(id: string): Promise<Schedule[] | null> {
    throw new Error('Method not implemented.');
  }
  async findManyByEmployId(id: string): Promise<Schedule[] | null> {
    throw new Error('Method not implemented.');
  }
  async findByUserId(id: string): Promise<Schedule | null> {
    throw new Error('Method not implemented.');
  }
  async findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null> {
    throw new Error('Method not implemented.');
  }
  async findByDate(date: string): Promise<Schedule[] | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async deleteManyById(id: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
