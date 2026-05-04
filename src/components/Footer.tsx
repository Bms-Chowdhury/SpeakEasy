import { Link } from 'react-router-dom';
import { Heart, ArrowUp, Mail, Twitter, Youtube, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = {
    quickLinks: [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
    categories: [
      { label: 'Beginner', to: '/blog?level=beginner' },
      { label: 'Intermediate', to: '/blog?level=intermediate' },
      { label: 'Advanced', to: '/blog?level=advanced' },
      { label: 'Grammar Tips', to: '/blog?category=grammar-tips' },
      { label: 'Daily Conversation', to: '/blog?category=daily-conversation' },
    ],
    resources: [
      { label: 'Free PDF Guide', to: '/blog' },
      { label: 'Newsletter', to: '/#newsletter' },
      { label: 'Popular Posts', to: '/blog' },
      { label: 'Speaking Tips', to: '/blog?category=speaking-tips' },
      { label: 'Vocabulary', to: '/blog?category=vocabulary' },
    ],
  };

  return (
    <>
      <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main Footer */}
          <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
            {/* Brand */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <span className="font-bold text-lg text-white">
                  Speak<span className="text-indigo-400">Easy</span>
                </span>
              </Link>
              <p className="mt-3 text-sm text-slate-400 max-w-xs leading-relaxed">
                Improve your English speaking daily with real-life scripts, conversations, and practical tips. Start learning today!
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Youtube size={16} />
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map(link => (
                  <li key={link.to + link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} SpeakEasy. Made with <Heart size={12} className="inline text-red-500 fill-red-500" /> for English learners.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
