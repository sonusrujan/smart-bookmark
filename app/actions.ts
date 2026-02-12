'use server'
 
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
 
export async function addBookmark(formData: FormData) {
  const supabase = createClient()
  const text = formData.get('bookmark')
 
  if (text === null) return
 
  const { data: { user } } = await supabase.auth.getUser()
 
  if (user === null) return

    const url = text.toString();
    const title = await getTitleFromUrl(url);

  await supabase.from('bookmarks').insert({ title, url, user_id: user.id })
 
  revalidatePath('/')
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