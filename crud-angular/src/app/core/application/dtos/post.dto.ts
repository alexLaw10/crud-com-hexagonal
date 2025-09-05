export interface PostDto {
  id: string;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
  userId?: number;
}

export interface PostApiResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}
