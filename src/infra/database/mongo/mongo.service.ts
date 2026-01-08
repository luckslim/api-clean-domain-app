import { EnvService } from '@/infra/env/env.service';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  constructor(private envService: EnvService) {}
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    const mongoUrl = this.envService.get('MONGO_DB_ATLAS');

    const mongoDbName = this.envService.get('MONGO_DB_NAME');

    if (!mongoUrl?.startsWith('mongodb')) {
      throw new Error(`Invalid MONGO_URL: ${mongoUrl}`);
    }

    this.client = new MongoClient(mongoUrl);
    await this.client.connect();

    this.db = this.client.db(mongoDbName);

    await this.db.collection('geography').createIndex({ location: '2dsphere' });
  }

  getDatabase(): Db {
    return this.db;
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
