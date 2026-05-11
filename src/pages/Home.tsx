import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heading2, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';
import Newsletter from '../components/Newsletter';
import { FeedAd, DesktopAdSlot } from '../components/ads';
import { categories } from '../lib/data';
import { usePostStore } from '../store/postStore';
import { useEffect, useState } from 'react';
import { Post } from '../lib/types';

export default function Home() {
  const { initialize, getPublishedPosts, getTrendingPosts, initialized } = usePostStore();
  
  // Add state for posts
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [trending, setTrending] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!initialized) {
        await initialize();
      }
      
      try {
        // Await both promises
        const [published, trendingPosts] = await Promise.all([
          getPublishedPosts(),
          getTrendingPosts()
        ]);
        
        setPublishedPosts(published || []);
        setTrending(trendingPosts || []);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPublishedPosts([]);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, [initialized, initialize, getPublishedPosts, getTrendingPosts]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading content...</p>
        </div>
      </div>
    );
  }

  const featured = publishedPosts[0];
  const latestPosts = publishedPosts.filter(p => p.type === 'blog').slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-purple-50/40 to-transparent dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6 border border-indigo-100 dark:border-indigo-900/50">
                <Sparkles size={12} />
                Free English Practice Resources
              </div>

              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6">
                Improve Your
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> English Speaking </span>
                Daily
              </h3>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                “Practice each day, fear goes away.”
              </p>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                “Start with fear, fluency is near.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/blog"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  Start Practicing
                </Link>
                <Link
                  to="/blog"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen size={16} />
                  Browse Content
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">50+</div>
                <div className="text-xs text-slate-500 mt-1">Scripts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
                <div className="text-xs text-slate-500 mt-1">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">100+</div>
                <div className="text-xs text-slate-500 mt-1">Tips & Guides</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Featured</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Our top pick this week</p>
            </div>
            <PostCard post={featured} featured />
          </div>
        </section>
      )}

      {/* Latest Content */}
      <section className="py-12 md:py-16 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Latest Blog Posts</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Grammar tips, vocabulary & speaking strategies</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {latestPosts.slice(0, 2).map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
            <FeedAd position={1} />
            {latestPosts.slice(2, 4).map((post, i) => (
              <PostCard key={post.id} post={post} index={i + 2} />
            ))}
            <FeedAd position={2} />
            {latestPosts.slice(4, 6).map((post, i) => (
              <PostCard key={post.id} post={post} index={i + 4} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
              View All Posts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Learn by Category</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Choose a topic that interests you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => {
              // Define distinct color styles for each category card
              const cardStyles = [
                { // Conversations
                  bg: "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/10",
                  border: "border-rose-200 dark:border-rose-900/30",
                  hoverBorder: "hover:border-rose-300 dark:hover:border-rose-800/50",
                  shadow: "shadow-rose-500/5",
                  hoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400"
                },
                { // Grammar
                  bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10",
                  border: "border-blue-200 dark:border-blue-900/30",
                  hoverBorder: "hover:border-blue-300 dark:hover:border-blue-800/50",
                  shadow: "shadow-blue-500/5",
                  hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                },
                { // Vocabulary
                  bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10",
                  border: "border-emerald-200 dark:border-emerald-900/30",
                  hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-800/50",
                  shadow: "shadow-emerald-500/5",
                  hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                },
                { // Pronunciation
                  bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10",
                  border: "border-violet-200 dark:border-violet-900/30",
                  hoverBorder: "hover:border-violet-300 dark:hover:border-violet-800/50",
                  shadow: "shadow-violet-500/5",
                  hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400"
                },
                { // Business
                  bg: "bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800/50 dark:to-gray-800/30",
                  border: "border-slate-300 dark:border-slate-700",
                  hoverBorder: "hover:border-slate-400 dark:hover:border-slate-600",
                  shadow: "shadow-slate-500/5",
                  hoverText: "group-hover:text-slate-700 dark:group-hover:text-slate-300"
                },
                { // Idioms
                  bg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/10",
                  border: "border-amber-200 dark:border-amber-900/30",
                  hoverBorder: "hover:border-amber-300 dark:hover:border-amber-800/50",
                  shadow: "shadow-amber-500/5",
                  hoverText: "group-hover:text-amber-600 dark:group-hover:text-amber-400"
                }
              ];
              const style = cardStyles[i % cardStyles.length];
              return (
                <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/blog?category=${cat.slug}`} className={`group block p-5 rounded-2xl ${style.bg} border ${style.border} ${style.hoverBorder} hover:shadow-lg hover:${style.shadow} transition-all duration-300`}>
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className={`font-semibold text-slate-900 dark:text-white mb-1 ${style.hoverText} transition-colors`}>{cat.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{cat.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SpeakEasy */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Why SpeakEasy?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Everything you need to speak English confidently</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <MessageSquare className="text-indigo-600" size={24} />, title: 'Real Conversations', desc: 'Practice with dialogue scripts based on real-life situations.', bg: "bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/20" },
              { icon: <Users className="text-purple-600" size={24} />, title: 'All Levels Welcome', desc: 'Whether you\'re a beginner or advanced, find content tailored to your goals.', bg: "bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/20" },
              { icon: <Sparkles className="text-pink-600" size={24} />, title: 'Learn by Doing', desc: 'Read out loud, listen with AI audio, and practice actively.', bg: "bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/20" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl ${item.bg} border border-slate-200/80 dark:border-slate-800`}>
                <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="py-8 border-t border-slate-100 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <DesktopAdSlot slotId="desktop-home-footer" height="90px" label="Advertisement" />
        </div>
      </section>
    </div>
  );
}