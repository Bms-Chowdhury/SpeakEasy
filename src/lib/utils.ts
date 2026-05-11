export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getCategoryInfo(slug: string) {
  const map: Record<string, { name: string; icon: string; color: string }> = {
    'daily-conversation': { name: 'Daily Conversation', icon: '💬', color: 'text-blue-600' },
    'job-interview': { name: 'Job Interview', icon: '💼', color: 'text-purple-600' },
    'grammar-tips': { name: 'Grammar Tips', icon: '📝', color: 'text-emerald-600' },
    'real-life-dialogues': { name: 'Real-Life Dialogues', icon: '🎭', color: 'text-orange-600' },
    'vocabulary': { name: 'Vocabulary', icon: '📚', color: 'text-rose-600' },
    'speaking-tips': { name: 'Speaking Tips', icon: '🗣️', color: 'text-cyan-600' },
  };
  return map[slug] || { name: slug, icon: '📄', color: 'text-gray-600' };
}

export function getLevelInfo(level: string) {
  const map: Record<string, { name: string; color: string; bgColor: string }> = {
    beginner: { name: 'Beginner', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30' },
    intermediate: { name: 'Intermediate', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/30' },
    advanced: { name: 'Advanced', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/30' },
  };
  return map[level] || { name: level, color: 'text-gray-600', bgColor: 'bg-gray-50' };
}

export function renderMarkdown(text: string): string {
  let html = text;
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-200">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">$1</h2>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-indigo-400 pl-4 py-2 my-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-r-lg text-slate-700 dark:text-slate-300 italic">$1</blockquote>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>');
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-slate-700 dark:text-slate-300">$1</li>');
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">');
  // Inline code
  html = html.replace(/`(.+?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400">$1</code>');
  // Tables (simple)
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim() && c.trim() !== '---');
    if (cells.length === 0) return '';
    return '<tr>' + cells.map(c => `<td class="border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm">${c.trim()}</td>`).join('') + '</tr>';
  });
  return html;
}
