import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res = NextResponse.next()
          res.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          res = NextResponse.next()
          res.cookies.delete(name)
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return res
}

export const config = {
  matcher: ['/', '/login'],
}
