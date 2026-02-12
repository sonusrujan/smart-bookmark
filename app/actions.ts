'use server'
 
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
 

export async function addBookmark(formData: FormData) {
  const supabase = await createClient();
  const url = formData.get('url');
  let title = formData.get('title');

  if (!url) return;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Check for duplicates
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('url', url.toString())
    .single();

  if (existing) {
    return;
  }

  let finalTitle = title && title.toString().trim() !== '' ? title.toString() : url.toString();

  await supabase.from('bookmarks').insert({ title: finalTitle, url: url.toString(), user_id: user.id });
  revalidatePath('/');
}

export async function deleteBookmark(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('bookmarks').delete().eq('id', id).eq('user_id', user.id);
  revalidatePath('/');
}

async function getTitleFromUrl(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        return titleMatch ? titleMatch[1] : url;
    } catch (error) {
        console.error('Error fetching title:', error);
        return url;
    }
}