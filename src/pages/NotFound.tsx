import { Link } from 'react-router-dom';
import { Home, Search, BookOpen, MessageSquare } from 'lucide-react';

export default function NotFound() {
  const popularPosts = [
    { title: 'How to Speak English Fast', to: '/blog/how-to-speak-english-fast' },
    { title: 'Restaurant Dialogue Script', to: '/scripts/ordering-food-at-restaurant-english-dialogue' },
    { title: 'Grammar Mistakes to Avoid', to: '/blog/grammar-mistakes-advanced-learners-make' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Oops! The page you're looking for doesn't exist. Maybe try one of these instead?
        </p>

        <div className="space-y-3 mb-8">
          {popularPosts.map((post, i) => (
            <Link
              key={i}
              to={post.to}
              className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors"
            >
              {i === 0 ? <BookOpen size={16} className="text-indigo-600 shrink-0" /> : <MessageSquare size={16} className="text-purple-600 shrink-0" />}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{post.title}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Home size={14} />
            Go Home
          </Link>
          <Link
            to="/scripts"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Search size={14} />
            Browse Scripts
          </Link>
        </div>
      </div>
    </div>
  );
}
