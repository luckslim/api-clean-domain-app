import { Uploader } from '@/domain/aplication/storage/uploader';
import { Module } from '@nestjs/common';
import { S3Amazon } from './s3amazon';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: S3Amazon }],
  exports: [Uploader],
})
export class StorageModule {}
