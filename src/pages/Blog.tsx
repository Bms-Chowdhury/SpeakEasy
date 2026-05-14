import { useState, useMemo, useEffect } from "react";
import { BookOpen, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "../components/PostCard";
import LevelFilter from "../components/LevelFilter";
import { FeedAd, DesktopAdSlot } from "../components/ads";
import { categories } from "../lib/data";
import { usePostStore } from "../store/postStore";
import { Level, PostCategory } from "../lib/types";

export default function Blog() {
  const {
    posts,
    initialize,
    initialized,
    setFilters,
    resetFilters,
    getFilteredPosts,
  } = usePostStore();
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<PostCategory | "all">(
    "all",
  );
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  // Always filter to blog posts only — no scripts
  useEffect(() => {
    setFilters({
      level: levelFilter,
      category: categoryFilter,
      type: "blog",
      status: "published",
    });
  }, [levelFilter, categoryFilter, setFilters]);

  const filteredPosts = useMemo(
    () => getFilteredPosts(),
    [getFilteredPosts, posts, levelFilter, categoryFilter],
  );

  const hasActiveFilters = levelFilter !== "all" || categoryFilter !== "all";

  const clearFilters = () => {
    setLevelFilter("all");
    setCategoryFilter("all");
    resetFilters();
  };

  const postRows = useMemo(() => {
    const rows: { posts: typeof filteredPosts; rowIndex: number }[] = [];
    for (let i = 0; i < filteredPosts.length; i += 2) {
      rows.push({
        posts: filteredPosts.slice(i, i + 2),
        rowIndex: Math.floor(i / 2),
      });
    }
    return rows;
  }, [filteredPosts]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
              SpeakEasy
            </h1>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Grammar tips, vocabulary guides, and speaking strategies to help
              you master English.
            </p>
          </motion.div>
        </div>
        <div className="mb-8 sticky top-16 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <LevelFilter selected={levelFilter} onChange={setLevelFilter} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              <Filter size={14} />
              <span className="hidden sm:inline">Category</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {(levelFilter !== "all" ? 1 : 0) +
                    (categoryFilter !== "all" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCategoryFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
                      >
                        All Categories
                      </button>
                      {categories
                        .filter((c) =>
                          [
                            "grammar-tips",
                            "vocabulary",
                            "speaking-tips",
                            "daily-conversation",
                          ].includes(c.slug),
                        )
                        .map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() =>
                              setCategoryFilter(cat.slug as PostCategory)
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === cat.slug ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
                          >
                            {cat.icon} {cat.name}
                          </button>
                        ))}
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <X size={12} />
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {postRows.map((row) => {
              const showFeedAd =
                (row.rowIndex + 1) % 2 === 0 &&
                row.rowIndex < postRows.length - 1;
              return (
                <div key={row.rowIndex} className="contents">
                  {row.posts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={row.rowIndex * 2 + i}
                    />
                  ))}
                  {showFeedAd && <FeedAd position={row.rowIndex} />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <BookOpen
                size={28}
                className="text-slate-300 dark:text-slate-600"
              />
            </div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
              No posts found
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Try adjusting your filters
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/50">
          <DesktopAdSlot
            slotId="desktop-blog-footer"
            height="90px"
            label="Advertisement"
          />
        </div>
      </div>
    </div>
  );
}
