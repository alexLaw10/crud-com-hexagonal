import { Post } from '../entities/post.entity';

export interface PostRepository {
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  findByUserId(userId: number): Promise<Post[]>;
  save(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
