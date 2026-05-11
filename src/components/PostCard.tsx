import { Link } from 'react-router-dom';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Post } from '../lib/types';
import { getCategoryInfo, getLevelInfo } from '../lib/utils';
import { useBookmarks } from '../lib/context';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: Post;
  index?: number;
  featured?: boolean;
}

export default function PostCard({ post, index = 0, featured = false }: PostCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const cat = getCategoryInfo(post.category);
  const level = getLevelInfo(post.level);
  const bookmarked = isBookmarked(post.id);
  const linkPath = `/blog/${post.slug}`;

  // Featured card — full-width hero style
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
      >
        <Link to={linkPath} className="block rounded-2xl overflow-hidden">
          <div className="relative aspect-[2/1] md:aspect-[3/1] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content overlaid on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${level.bgColor} ${level.color}`}>
                  {level.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-white/15 backdrop-blur-sm text-white">
                  {cat.icon} {cat.name}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-200 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-white/75 leading-relaxed line-clamp-2 max-w-2xl mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <Clock size={12} />
                  {post.readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </Link>
        {/* Bookmark */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(post.id); }}
          className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
            bookmarked
              ? 'bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-black/30 text-white/70 hover:bg-black/50 hover:text-white'
          }`}
        >
          {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </motion.div>
    );
  }

  // Standard grid card — magazine style
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="group relative flex flex-col"
    >
      <Link
        to={linkPath}
        className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/[0.08] transition-all duration-300"
      >
        {/* Featured Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Level badge on image */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${level.bgColor} ${level.color} shadow-sm`}>
              {level.name}
            </span>
          </div>
        </div>

        {/* Card Body — flex-1 ensures equal height */}
        <div className="flex flex-col flex-1 p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt — max 2-3 lines */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              {cat.icon} {cat.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock size={12} />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>

      {/* Bookmark button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(post.id); }}
        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
          bookmarked
            ? 'bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/30'
            : 'bg-black/25 text-white/70 hover:bg-black/45 hover:text-white'
        }`}
      >
        {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      </button>
    </motion.article>
  );
}
