import { Post } from '../../domain/entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';

export interface PostPort {
  createPost(createPostDto: CreatePostDto): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
  getAllPosts(): Promise<Post[]>;
  updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
