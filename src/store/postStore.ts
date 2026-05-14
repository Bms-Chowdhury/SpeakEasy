import { create } from "zustand";
import {
  Post,
  CreatePostData,
  UpdatePostData,
  PostCategory,
  PostType,
  Level,
} from "../lib/types";
import { postsApi } from "../lib/api";
import { cache, CACHE_TTL } from "../lib/cache";
import { seedPosts } from "../lib/data";

interface PostFilters {
  category: PostCategory | "all";
  level: Level | "all";
  type: PostType | "all";
  status: "draft" | "published" | "all";
  search: string;
}

interface PostState {
  // Data — stores ALL posts (published + drafts)
  posts: Post[];
  currentPost: Post | null;
  filters: PostFilters;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Initialization
  initialized: boolean;
  initialize: () => Promise<void>; // Made async

  // CRUD - Now all return Promises
  getPosts: () => Promise<Post[]>;
  getPostBySlug: (slug: string) => Promise<Post | undefined>;
  getPostById: (id: string) => Promise<Post | undefined>;

  // Published-only getters — used by public pages
  getPublishedPosts: () => Promise<Post[]>;
  getPublishedPostBySlug: (slug: string) => Promise<Post | undefined>;

  createPost: (data: CreatePostData) => Promise<Post>;
  updatePost: (data: UpdatePostData) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
  togglePostStatus: (id: string) => Promise<Post | null>;

  // Filters
  setFilters: (filters: Partial<PostFilters>) => void;
  resetFilters: () => void;
  getFilteredPosts: () => Post[]; // This stays sync as it filters existing state

  // Helpers — all return published-only
  getPostsByType: (type: PostType) => Post[];
  getPostsByCategory: (category: PostCategory) => Post[];
  getPostsByLevel: (level: Level) => Post[];
  getTrendingPosts: () => Post[];
  getRelatedPosts: (post: Post, limit?: number) => Post[];
  refreshPosts: () => Promise<void>; // Made async
}

const defaultFilters: PostFilters = {
  category: "all",
  level: "all",
  type: "all",
  status: "all",
  search: "",
};

/**
 * Reload all posts from the API into the store and update cache.
 * This is the single source of truth for post list refresh.
 */
async function reloadAllPosts(): Promise<Post[]> {
  const allPosts = await postsApi.getAll(); // Added await
  cache.invalidatePrefix("posts");
  cache.set("posts_all", allPosts, CACHE_TTL.POSTS_LIST);
  return allPosts;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  currentPost: null,
  filters: { ...defaultFilters },
  isLoading: false,
  isSaving: false,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;

    // Seed localStorage on first run

    // Load from cache or API — store ALL posts (published + drafts)
    const cached = cache.get<Post[]>("posts_all");
    if (cached) {
      set({ posts: cached, initialized: true });
    } else {
      const allPosts = await postsApi.getAll(); // Added await
      cache.set("posts_all", allPosts, CACHE_TTL.POSTS_LIST);
      set({ posts: allPosts, initialized: true });
    }
  },

  getPosts: async () => {
    const state = get();
    if (!state.initialized) await state.initialize(); // Added await
    return state.posts;
  },

  getPostBySlug: async (slug: string) => {
    const state = get();
    if (!state.initialized) await state.initialize(); // Added await
    return state.posts.find((p) => p.slug === slug);
  },

  getPostById: async (id: string) => {
    const state = get();
    if (!state.initialized) await state.initialize(); // Added await
    return state.posts.find((p) => p.id === id);
  },

  // ─── Published-only getters (for public pages) ──────────────

  getPublishedPosts: async () => {
    const state = get();
    if (!state.initialized) await state.initialize(); // Added await
    return state.posts.filter((p) => p.status === "published");
  },

  getPublishedPostBySlug: async (slug: string) => {
    const state = get();
    if (!state.initialized) await state.initialize(); // Added await
    return state.posts.find((p) => p.slug === slug && p.status === "published");
  },

  // ─── CRUD ───────────────────────────────────────────────────

  createPost: async (data: CreatePostData) => {
    set({ isSaving: true });
    const post = await postsApi.create(data); // Added await
    // Reload ALL posts — drafts must stay visible in admin
    const allPosts = await reloadAllPosts(); // Added await
    set({ posts: allPosts, isSaving: false });
    return post;
  },

  updatePost: async (data: UpdatePostData) => {
    set({ isSaving: true });
    const result = await postsApi.update(data); // Added await
    if (result) {
      const allPosts = await reloadAllPosts(); // Added await
      set({ posts: allPosts, isSaving: false });
    } else {
      set({ isSaving: false });
    }
    return result;
  },

  deletePost: async (id: string) => {
    const success = await postsApi.delete(id); // Added await
    if (success) {
      const allPosts = await reloadAllPosts(); // Added await
      set({ posts: allPosts });
    }
    return success;
  },

  togglePostStatus: async (id: string) => {
    const result = await postsApi.toggleStatus(id); // Added await
    if (result) {
      const allPosts = await reloadAllPosts(); // Added await
      set({ posts: allPosts });
    }
    return result;
  },

  // ─── Filters ───────────────────────────────────────────────

  setFilters: (newFilters: Partial<PostFilters>) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters } });
  },

  getFilteredPosts: () => {
    const { posts, filters } = get();
    return posts.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (filters.level !== "all" && p.level !== filters.level) return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  },

  // ─── Helpers — published only ──────────────────────────────

  getPostsByType: (type: PostType) => {
    return get().posts.filter(
      (p) => p.type === type && p.status === "published",
    );
  },

  getPostsByCategory: (category: PostCategory) => {
    return get().posts.filter(
      (p) => p.category === category && p.status === "published",
    );
  },

  getPostsByLevel: (level: Level) => {
    return get().posts.filter(
      (p) => p.level === level && p.status === "published",
    );
  },

  getTrendingPosts: () => {
    const trendingSlugs = [
      "how-to-speak-english-fast",
      "grammar-mistakes-advanced-learners-make",
      "essential-english-phrases-for-travelers",
    ];
    return get().posts.filter(
      (p) => trendingSlugs.includes(p.slug) && p.status === "published",
    );
  },

  getRelatedPosts: (post: Post, limit = 3) => {
    return get()
      .posts.filter(
        (p) =>
          p.id !== post.id &&
          p.status === "published" &&
          (p.category === post.category || p.level === post.level),
      )
      .slice(0, limit);
  },

  refreshPosts: async () => {
    const allPosts = await reloadAllPosts(); // Added await
    set({ posts: allPosts });
  },
}));
