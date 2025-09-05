import { BaseEntity } from './base.entity';

export class Post extends BaseEntity {
  public readonly title: string;
  public readonly body: string;
  public readonly userId: number;

  constructor(
    id: string,
    title: string,
    body: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  public equals(entity: BaseEntity): boolean {
    if (!(entity instanceof Post)) {
      return false;
    }
    return this.id === entity.id;
  }

  public updateTitle(newTitle: string): Post {
    return new Post(
      this.id,
      newTitle,
      this.body,
      this.userId,
      this.createdAt,
      new Date()
    );
  }

  public updateBody(newBody: string): Post {
    return new Post(
      this.id,
      this.title,
      newBody,
      this.userId,
      this.createdAt,
      new Date()
    );
  }

  public updateContent(title: string, body: string): Post {
    return new Post(
      this.id,
      title,
      body,
      this.userId,
      this.createdAt,
      new Date()
    );
  }
}
