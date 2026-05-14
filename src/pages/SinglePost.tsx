import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import AudioPlayer from "../components/AudioPlayer";
import PostCard from "../components/PostCard";
import { InContentAd, StickySidebarAd, MobileAdSlot } from "../components/ads";
import {
  getCategoryInfo,
  getLevelInfo,
  formatDate,
  renderMarkdown,
} from "../lib/utils";
import { useBookmarks } from "../lib/context";
import { usePostStore } from "../store/postStore";
import { useState, useMemo, useEffect } from "react";
import { Post } from "../lib/types";

export default function SinglePost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    posts: _posts,
    initialize,
    initialized,
    getRelatedPosts,
    getPublishedPostBySlug,
  } = usePostStore();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<Post | undefined>(undefined);

  // ✅ FIX 1: Initialize only once
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // ✅ FIX 2: Get post by slug
  useEffect(() => {
    if (!slug || !initialized) return;
    getPublishedPostBySlug(slug).then(setPost);
  }, [slug, initialized, getPublishedPostBySlug]);

  const contentSections = useMemo(() => {
    if (!post) return [];
    const html = renderMarkdown(post.content);
    const parts = html.split(/(<\/p>)/);
    const sections: string[] = [];
    let current = "";
    for (let i = 0; i < parts.length; i++) {
      current += parts[i];
      if (parts[i] === "</p>") {
        sections.push(current);
        current = "";
      }
    }
    if (current.trim()) sections.push(current);
    return sections;
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Post Not Found
          </h1>
          <p className="text-slate-500 mb-4">
            The post you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const cat = getCategoryInfo(post.category);
  const level = getLevelInfo(post.level);
  const bookmarked = isBookmarked(post.id);
  const related = getRelatedPosts(post);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
      );
    }
    setShowShare(false);
  };

  const totalSections = contentSections.length;
  const adAfterFirst = 1;
  const adAfterMiddle = Math.floor(totalSections / 2);
  const adBeforeEnd = totalSections - 1;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link
            to="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            to="/blog"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-white truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="flex gap-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-0 max-w-4xl"
          >
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${level.bgColor} ${level.color}`}
                >
                  {level.name}
                </span>
                <span className="text-sm">{cat.icon}</span>
                <span className="text-xs font-medium text-slate-500">
                  {cat.name}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={12} />
                  {post.readingTime} min read
                </span>
                {post.status === "draft" && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-600">
                    Draft
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-500">
                  {formatDate(post.date)}
                </span>
                <div className="flex items-center gap-2">
                  <AudioPlayer
                    text={post.title + ". " + post.excerpt}
                    label="Listen"
                  />
                  <div className="relative">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                    {showShare && (
                      <div className="absolute right-0 top-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 w-44 z-20">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 w-full"
                        >
                          <Twitter size={14} /> Twitter
                        </button>
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 w-full"
                        >
                          <Facebook size={14} /> Facebook
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 w-full"
                        >
                          <LinkIcon size={14} />{" "}
                          {copied ? "Copied!" : "Copy Link"}
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-colors ${bookmarked ? "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"}`}
                  >
                    {bookmarked ? (
                      <BookmarkCheck size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>
                </div>
              </div>
            </header>

            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                loading="lazy"
              />
            </div>

            <div className="mb-12">
              {post.type === "script" &&
                post.dialogues &&
                post.dialogues.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      💬 Dialogue
                    </h2>
                    <div className="space-y-3">
                      {post.dialogues.map((d, i) => (
                        <div
                          key={i}
                          className={`flex gap-3 ${d.speaker === "You" ? "flex-row-reverse" : ""}`}
                        >
                          <div
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${d.speaker === "You" ? "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                          >
                            {d.speaker.charAt(0)}
                          </div>
                          <div
                            className={`max-w-[80%] ${d.speaker === "You" ? "bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl rounded-tr-sm" : "bg-slate-50 dark:bg-slate-800/50 rounded-2xl rounded-tl-sm"} px-4 py-3`}
                          >
                            <p
                              className={`text-xs font-medium mb-1 ${d.speaker === "You" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`}
                            >
                              {d.speaker}
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {d.line}
                            </p>
                            <div className="mt-2">
                              <AudioPlayer text={d.line} label="🔊" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="prose prose-slate dark:prose-invert max-w-none">
                {contentSections.map((section, i) => (
                  <div key={i}>
                    <div dangerouslySetInnerHTML={{ __html: section }} />
                    {i === adAfterFirst && (
                      <InContentAd slotId="post-incontent-top" position="top" />
                    )}
                    {i === adAfterMiddle && (
                      <InContentAd
                        slotId="post-incontent-middle"
                        position="middle"
                      />
                    )}
                    {i === adBeforeEnd && totalSections > 4 && (
                      <InContentAd
                        slotId="post-incontent-bottom"
                        position="bottom"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Continue Reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((p, i) => (
                    <PostCard key={p.id} post={p} index={i} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <MobileAdSlot
                slotId="mobile-post-end"
                height="100px"
                label="Advertisement"
                className="rounded-lg"
              />
            </div>
          </motion.article>

          <StickySidebarAd />
        </div>
      </div>
    </div>
  );
}
