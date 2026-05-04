import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function uploadImageToStorage(file: File): Promise<string | null> {
  try {
    const ext = file.name.split('.').pop() || 'png';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filePath = `${timestamp}-${random}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return urlData?.publicUrl || null;
  } catch (err) {
    console.error('Image upload failed:', err);
    return null;
  }
}