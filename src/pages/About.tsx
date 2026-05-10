import { Heart, Target, Eye, Users, Globe, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SpeakEasy</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We believe everyone deserves to speak English with confidence. Our mission is to make English learning accessible, practical, and enjoyable.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100/50 dark:border-indigo-900/30 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart className="text-pink-500" size={24} />
              Our Story
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                SpeakEasy started from a simple observation: millions of people study English for years but still can't speak it confidently. They know the grammar rules, they can read books, but when it comes to real conversations — they freeze.
              </p>
              <p>
                We realized that traditional education focuses too much on reading and writing, and not enough on <strong className="text-slate-800 dark:text-slate-200">speaking practice</strong>. That's why we created SpeakEasy — a place where you can practice real English conversations.
              </p>
              <p>
                Our dialogue scripts are based on real situations: ordering food, job interviews, small talk at parties, visiting the doctor, and more. Each script comes with audio playback so you can hear the correct pronunciation and practice along.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 border border-slate-200/80 dark:border-slate-800"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center mb-4">
              <Target className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To help 1 million English learners speak confidently in real-life situations by providing practical, dialogue-based learning resources that are free and accessible to everyone.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 border border-slate-200/80 dark:border-slate-800"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center mb-4">
              <Eye className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A world where language barriers don't hold anyone back from opportunities. Where every person can express themselves clearly and confidently in English.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Users className="text-indigo-600 dark:text-indigo-400" size={20} />, title: 'Community', desc: 'Learning is better together. We build for real people with real needs.' },
              { icon: <Globe className="text-purple-600 dark:text-purple-400" size={20} />, title: 'Accessibility', desc: 'Free, quality English resources for everyone, everywhere.' },
              { icon: <BookOpen className="text-pink-600 dark:text-pink-400" size={20} />, title: 'Practicality', desc: 'Real conversations, not textbook English. Learn what you\'ll actually use.' },
            ].map((v, i) => (
              <div key={i} className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 border border-slate-200/80 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center mx-auto mb-3">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{v.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to Start?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Join thousands of learners improving their English every day.</p>
          <a
            href="/scripts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            Start Learning Today
          </a>
        </div>
      </div>
    </div>
  );
}