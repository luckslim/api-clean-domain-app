import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, type UserProps } from "@/domain/enterprise/user-entity";
import { faker } from "@faker-js/faker";

export function MakeUser(override: Partial<UserProps>, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.word.noun(),
      userName: faker.word.noun(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      typeUser: "user",
      ...override,
    },
    id
  );
  return user;
}
