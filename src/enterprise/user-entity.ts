import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { UserTypeProps } from "@/core/types/type-user";

interface UserProps {
  name: string;
  userName: string;
  typeUser: UserTypeProps;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get userName() {
    return this.props.userName;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set userName(userName: string) {
    this.props.userName = userName;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set password(password: string) {
    this.props.password = password;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);
    return user;
  }
}
