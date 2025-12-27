import { HashGenerator } from '@/domain/aplication/cryptography/hash-generator';
import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher';
import { HashComparer } from '@/domain/aplication/cryptography/hash-comparer';
import { JwtEncrypter } from './jwt-encrypter';
import { Encrypter } from '@/domain/aplication/cryptography/encryter';

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class cryptographyModule {}
