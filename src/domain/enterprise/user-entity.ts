import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { UserTypeProps } from "@/core/types/type-user";

export interface UserProps {
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
    if (!name.trim()) throw new Error("field empty not allowed");
    this.props.name = name;
  }

  set userName(userName: string) {
    if (!userName.trim()) throw new Error("field empty not allowed");
    this.props.userName = userName;
  }

  set email(email: string) {
    if (!email.trim()) throw new Error("field empty not allowed");
    this.props.email = email;
  }

  set password(password: string) {
    if (!password.trim()) throw new Error("field empty not allowed");
    this.props.password = password;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);
    return user;
  }
}
