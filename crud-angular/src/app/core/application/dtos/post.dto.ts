// Base interface with all post properties
interface BasePost {
  id: string;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// API Response interface (id as number from external API)
interface BasePostApiResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Core post data (without metadata)
type PostCoreData = Pick<BasePost, 'title' | 'body' | 'userId'>;

// DTOs using utility types
export type PostDto = BasePost;

export type CreatePostDto = PostCoreData;

export type UpdatePostDto = Partial<PostCoreData>;

export type PostApiResponse = BasePostApiResponse;

// Additional utility types for specific use cases
export type PostSummary = Pick<BasePost, 'id' | 'title' | 'createdAt'>;

export type PostWithoutTimestamps = Omit<BasePost, 'createdAt' | 'updatedAt'>;

export type PostWithOptionalId = Omit<BasePost, 'id'> & { id?: string };
