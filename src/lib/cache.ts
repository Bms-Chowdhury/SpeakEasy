/**
 * Multi-layer cache utility.
 * Layer 1: Memory (fastest, per-session)
 * Layer 2: localStorage (persistent across sessions)
 * Layer 3: Backend sync (Firebase/Supabase — only when needed)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time-to-live in ms
}

class CacheManager {
  private memoryCache = new Map<string, CacheEntry<unknown>>();
  private readonly STORAGE_PREFIX = 'se_cache_';

  /**
   * Get from cache — checks memory first, then localStorage
   */
  get<T>(key: string): T | null {
    // Layer 1: Memory
    const memEntry = this.memoryCache.get(key);
    if (memEntry && Date.now() - memEntry.timestamp < memEntry.ttl) {
      return memEntry.data as T;
    }

    // Layer 2: localStorage
    try {
      const raw = localStorage.getItem(this.STORAGE_PREFIX + key);
      if (!raw) return null;
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() - entry.timestamp < entry.ttl) {
        // Promote to memory cache
        this.memoryCache.set(key, entry);
        return entry.data;
      }
      // Expired — clean up
      localStorage.removeItem(this.STORAGE_PREFIX + key);
      this.memoryCache.delete(key);
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Set cache — writes to both memory and localStorage
   */
  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    const entry: CacheEntry<T> = { data, timestamp: Date.now(), ttl: ttlMs };
    // Layer 1: Memory
    this.memoryCache.set(key, entry);
    // Layer 2: localStorage
    try {
      localStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(entry));
    } catch {
      // localStorage full — clear old entries
      this.clearExpired();
    }
  }

  /**
   * Invalidate a specific key
   */
  invalidate(key: string): void {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(this.STORAGE_PREFIX + key);
    } catch { /* ignore */ }
  }

  /**
   * Invalidate all keys matching a prefix
   */
  invalidatePrefix(prefix: string): void {
    // Memory
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(prefix)) this.memoryCache.delete(key);
    }
    // localStorage
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith(this.STORAGE_PREFIX + prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith(this.STORAGE_PREFIX)) keysToRemove.push(k);
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
  }

  /**
   * Clear expired entries from localStorage
   */
  private clearExpired(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k?.startsWith(this.STORAGE_PREFIX)) continue;
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        try {
          const entry = JSON.parse(raw);
          if (Date.now() - entry.timestamp >= entry.ttl) {
            keysToRemove.push(k);
          }
        } catch {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
    }
}

// Singleton
export const cache = new CacheManager();

// TTL constants
export const CACHE_TTL = {
  POSTS_LIST: 5 * 60 * 1000,     // 5 minutes
  SINGLE_POST: 10 * 60 * 1000,   // 10 minutes
  DASHBOARD: 2 * 60 * 1000,      // 2 minutes
  AUTH_SESSION: 24 * 60 * 60 * 1000, // 24 hours
};
