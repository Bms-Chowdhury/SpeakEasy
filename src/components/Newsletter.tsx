import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client'

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    const { error: supabaseError } = await supabase
      .from('subscribers')
      .insert({ email: email.trim() });

    if (supabaseError) {
      if (supabaseError.code === '23505') {
        setError('এই email আগেই subscribe করা আছে!');
      } else {
        setError('কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করো।');
      }
      setLoading(false);
    } else {
      setSubmitted(true);
      setEmail('');
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium mb-6">
              <Download size={12} />
              Free PDF: 100 Essential English Phrases
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Start Learning English Today
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm md:text-base">
              Join 10,000+ learners. Get weekly scripts, tips, and a free PDF with 100 essential English phrases.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white"
              >
                <CheckCircle size={20} />
                <span className="font-medium">Welcome aboard! Check your email.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Start Learning
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-200 text-sm mt-3"
              >
                {error}
              </motion.p>
            )}

            <p className="text-white/50 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}