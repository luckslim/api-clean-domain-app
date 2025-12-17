import type { Time } from "@/domain/enterprise/time-entity";

export interface timeRepository {
  create(time: Time): Promise<Time>;
  findById(id: string): Promise<Time | null>;
  findManyById(id: string): Promise<Time[] | null>;
  delete(id: string): Promise<void>;
}
