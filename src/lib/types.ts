export type Level = "beginner" | "intermediate" | "advanced";
export type PostCategory =
  | "daily-conversation"
  | "job-interview"
  | "grammar-tips"
  | "real-life-dialogues"
  | "vocabulary"
  | "speaking-tips";
export type PostType = "blog" | "script";
export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  level: Level;
  readingTime: number;
  featuredImage: string;
  date: string;
  tags: string[];
  type: PostType;
  status: PostStatus;
  dialogues?: Dialogue[];
  createdAt: string;
  updatedAt: string;
}

export interface Dialogue {
  speaker: string;
  line: string;
  translation?: string;
}

export interface CategoryInfo {
  slug: PostCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LevelInfo {
  slug: Level;
  name: string;
  color: string;
  bgColor: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "editor";
}

export interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  level: Level;
  type: PostType;
  status: PostStatus;
  featuredImage: string;
  tags: string[];
  dialogues?: Dialogue[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

// Raw post type for seed data (without required status/timestamps)
export interface RawPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  level: Level;
  readingTime: number;
  featuredImage: string;
  date: string;
  tags: string[];
  type: PostType;
  dialogues?: Dialogue[];
  status?: PostStatus;
  createdAt?: string;
  updatedAt?: string;
}
