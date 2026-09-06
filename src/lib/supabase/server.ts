import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseConfig } from "./env";

/**
 * Supabase client for Server Components, Route Handlers, and Server Actions.
 *
 * Must be created per request — never hoisted to a module-level singleton —
 * because it closes over that request's cookies.
 */
export async function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot set cookies. Safe to ignore while there
          // is no auth flow; once sessions exist, middleware refreshes them.
        }
      },
    },
  });
}
