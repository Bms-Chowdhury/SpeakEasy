import { supabase } from "./supabase"; /**
 
 * API Abstraction Layer
 *
 * Currently uses localStorage as the persistence backend.
 * Swap the implementation inside each function to connect Firebase/Supabase.
 *
 * Firebase migration guide:
 *   - Replace localStorage calls with Firestore doc/set/get
 *   - Replace generateId() with Firestore auto-ID
 *   - Add Firebase Auth calls in auth section
 *
 * Supabase migration guide:
 *   - Replace localStorage calls with supabase.from('posts').*()
 *   - Replace auth section with supabase.auth.*()
 */

import { createClient } from "@supabase/supabase-js";
import {
  Post,
  CreatePostData,
  UpdatePostData,
  AdminUser,
  RawPost,
} from "./types";
import { generateSlug, estimateReadingTime, sanitizeText } from "./validation";

// ─── Supabase Client ─────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ─── Posts API ───────────────────────────────────────────────────

export const postsApi = {
  /**
   * Get all posts from Supabase
   */
  async getAll(): Promise<Post[]> {
    // ✅ session refresh করুন যাতে JWT এ admin role থাকে
    await supabase.auth.refreshSession();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get a single post by ID
   */
  async getById(id: string): Promise<Post | undefined> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return undefined;
    return data;
  },

  /**
   * Get a single post by slug
   */
  async getBySlug(slug: string): Promise<Post | undefined> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return undefined;
    return data;
  },

  /**
   * Get published posts only (for public site)
   */
  async getPublished(): Promise<Post[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Create a new post
   */
  async create(data: CreatePostData): Promise<Post> {
    const now = new Date().toISOString();
    const slug = generateSlug(data.title);

    const { data: existingSlugs } = await supabase.from("posts").select("slug");
    const slugList = existingSlugs?.map((s) => s.slug) || [];
    let finalSlug = slug;
    let counter = 1;
    while (slugList.includes(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // ✅ current user এর id নিন
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const post = {
      title: sanitizeText(data.title),
      slug: finalSlug,
      excerpt: sanitizeText(data.excerpt),
      content: data.content,
      category: data.category,
      level: data.level,
      type: data.type,
      status: data.status,
      featuredImage:
        data.featuredImage ||
        "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: data.tags?.map((t) => sanitizeText(t)).filter(Boolean) || [],
      readingTime: estimateReadingTime(data.content),
      date: now.split("T")[0],
      created_at: now,
      updatedAt: now,
      dialogues: data.dialogues,
      author_id: user?.id, // ✅ এটা যোগ করুন
    };

    const { data: insertedPost, error } = await supabase
      .from("posts")
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return insertedPost;
  },

  /**
   * Update an existing post (partial update — only changed fields)
   */
  async update(data: UpdatePostData): Promise<Post | null> {
    const now = new Date().toISOString();
    const { data: existing } = await supabase
      .from("posts")
      .select("*")
      .eq("id", data.id)
      .single();
    if (!existing) return null;

    const updates: any = {
      ...(data.title !== undefined && { title: sanitizeText(data.title) }),
      ...(data.excerpt !== undefined && {
        excerpt: sanitizeText(data.excerpt),
      }),
      ...(data.content !== undefined && {
        content: data.content,
        readingTime: estimateReadingTime(data.content),
      }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.level !== undefined && { level: data.level }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.featuredImage !== undefined && {
        featuredImage: data.featuredImage,
      }),
      ...(data.tags !== undefined && {
        tags: data.tags?.map((t) => sanitizeText(t)).filter(Boolean),
      }),
      ...(data.dialogues !== undefined && { dialogues: data.dialogues }),
      updatedAt: now,
    };

    // If title changed, update slug
    if (data.title && data.title !== existing.title) {
      const newSlug = generateSlug(data.title);
      const { data: existingSlugs } = await supabase
        .from("posts")
        .select("slug")
        .neq("id", data.id);
      const slugList = existingSlugs?.map((s) => s.slug) || [];

      let finalSlug = newSlug;
      let counter = 1;
      while (slugList.includes(finalSlug)) {
        finalSlug = `${newSlug}-${counter}`;
        counter++;
      }
      updates.slug = finalSlug;
      updates.date = now.split("T")[0];
    }

    const { data: updatedPost, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;
    return updatedPost;
  },

  /**
   * Delete a post
   */
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    return !error;
  },

  /**
   * Toggle post status (draft ↔ published)
   */
  async toggleStatus(id: string): Promise<Post | null> {
    const { data: post } = await supabase
      .from("posts")
      .select("status")
      .eq("id", id)
      .single();
    if (!post) return null;
    return this.update({
      id,
      status: post.status === "published" ? "draft" : "published",
    });
  },
};

// ─── Auth API ────────────────────────────────────────────────────

export const authApi = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<AdminUser | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) return null;

    return {
      uid: data.user.id,
      email: data.user.email!,
      displayName: data.user.user_metadata.displayName || "Admin",
      role: "admin",
    };
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await supabase.auth.signOut();
  },

  /**
   * Get current session
   */
  async getSession(): Promise<AdminUser | null> {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return null;

    return {
      uid: session.user.id,
      email: session.user.email!,
      displayName: session.user.user_metadata.displayName || "Admin",
      role: "admin",
    };
  },

  /**
   * Check if session is valid
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null;
  },
};
