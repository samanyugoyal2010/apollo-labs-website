import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseConfig } from "./env";

/**
 * Supabase client for Client Components.
 *
 * `createBrowserClient` memoizes internally, so calling this per component is
 * fine — it does not open a new connection each time.
 */
export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  return createBrowserClient(url, publishableKey);
}
