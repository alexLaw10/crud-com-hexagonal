import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  public readonly name: string;
  public readonly email: string;
  public readonly isActive: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }

  public equals(entity: BaseEntity): boolean {
    if (!(entity instanceof User)) {
      return false;
    }
    return this.id === entity.id;
  }

  public activate(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      true,
      this.createdAt,
      new Date()
    );
  }

  public deactivate(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      false,
      this.createdAt,
      new Date()
    );
  }
}
