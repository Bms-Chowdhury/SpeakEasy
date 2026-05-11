/**
 * Input validation & sanitization utilities.
 * Prevents XSS, injection, and malformed data.
 */

/**
 * Strip HTML tags from a string (XSS prevention)
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Sanitize plain text input (titles, excerpts, tags)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Generate an SEO-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 100);
}

/**
 * Validate post creation data
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validatePost(data: {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  level?: string;
  type?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  } else if (data.title.trim().length > 200) {
    errors.title = 'Title must be under 200 characters';
  }

  if (!data.excerpt?.trim()) {
    errors.excerpt = 'Excerpt is required';
  } else if (data.excerpt.trim().length < 10) {
    errors.excerpt = 'Excerpt must be at least 10 characters';
  }

  if (!data.content?.trim()) {
    errors.content = 'Content is required';
  } else if (data.content.trim().length < 20) {
    errors.content = 'Content must be at least 20 characters';
  }

  const validCategories = ['daily-conversation', 'job-interview', 'grammar-tips', 'real-life-dialogues', 'vocabulary', 'speaking-tips'];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.category = 'Invalid category';
  }

  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (!data.level || !validLevels.includes(data.level)) {
    errors.level = 'Invalid level';
  }

  const validTypes = ['blog', 'script'];
  if (!data.type || !validTypes.includes(data.type)) {
    errors.type = 'Invalid type';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  const errors: Record<string, string> = {};
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Estimate reading time from content
 */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
