import { useState, useMemo, useEffect } from 'react';
import { MessageSquare, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';
import LevelFilter from '../components/LevelFilter';
import { categories } from '../lib/data';
import { usePostStore } from '../store/postStore';
import { Level, PostCategory } from '../lib/types';

export default function Scripts() {
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<PostCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const { posts, initialize, initialized } = usePostStore();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const allScripts = useMemo(() => posts.filter(p => p.type === 'script' && p.status === 'published'), [posts]);

  const filteredScripts = useMemo(() => {
    return allScripts.filter(p => {
      if (levelFilter !== 'all' && p.level !== levelFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      return true;
    });
  }, [allScripts, levelFilter, categoryFilter]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2"><MessageSquare size={20} className="text-purple-600" /><span className="text-sm font-medium text-purple-600 dark:text-purple-400">Practice Scripts</span></div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">English Dialogue Scripts</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Practice real English conversations with our dialogue scripts. Read out loud, listen with AI audio, and build your speaking confidence.</p>
          </motion.div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <LevelFilter selected={levelFilter} onChange={setLevelFilter} />
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${showFilters || categoryFilter !== 'all' ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}><Filter size={14} />Category</button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setCategoryFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>All Categories</button>
              {categories.filter(c => ['daily-conversation', 'job-interview', 'real-life-dialogues'].includes(c.slug)).map(cat => (<button key={cat.slug} onClick={() => setCategoryFilter(cat.slug as PostCategory)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === cat.slug ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>{cat.icon} {cat.name}</button>))}
            </motion.div>
          )}
        </div>

        {filteredScripts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScripts.map((post, i) => (<PostCard key={post.id} post={post} index={i} />))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MessageSquare size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-lg font-medium text-slate-500 dark:text-slate-400">No scripts found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
            <button onClick={() => { setLevelFilter('all'); setCategoryFilter('all'); }} className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
