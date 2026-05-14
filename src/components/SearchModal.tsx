import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, FileText, MessageSquare } from "lucide-react";
import { usePostStore } from "../store/postStore";
import { getCategoryInfo, getLevelInfo } from "../lib/utils";
import { Post } from "../lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { initialized, initialize, getPublishedPosts } = usePostStore();

  // ✅ FIX 1: Changed 'posts' to '_posts' since it's not used
  const { posts: _posts } = usePostStore();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  // ✅ FIX 2: Split the effect - remove setState from the main effect body
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ✅ FIX 3: Separate effect for clearing state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Search effect
  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length <= 1) {
        setResults([]);
        return;
      }

      const publishedPosts = await getPublishedPosts();

      const filtered = publishedPosts
        .filter(
          (p: Post) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t: string) =>
              t.toLowerCase().includes(query.toLowerCase()),
            ),
        )
        .slice(0, 6);

      setResults(filtered);
    };

    performSearch();
  }, [query, getPublishedPosts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scripts, blog posts, topics..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X size={16} />
          </button>
        </div>

        {query.trim().length > 1 && (
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((post: Post) => {
                  const cat = getCategoryInfo(post.category);
                  const level = getLevelInfo(post.level);
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div
                        className={`mt-0.5 p-1.5 rounded-lg ${post.type === "script" ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600" : "bg-blue-50 dark:bg-blue-950/30 text-blue-600"}`}
                      >
                        {post.type === "script" ? (
                          <MessageSquare size={14} />
                        ) : (
                          <FileText size={14} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">
                            {cat.icon} {cat.name}
                          </span>
                          <span className="text-xs text-slate-300 dark:text-slate-600">
                            •
                          </span>
                          <span className={`text-xs ${level.color}`}>
                            {level.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">
                        {post.readingTime}m
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {query.trim().length <= 1 && (
          <div className="py-6 text-center">
            <p className="text-sm text-slate-400">Start typing to search...</p>
          </div>
        )}
      </div>
    </div>
  );
}
