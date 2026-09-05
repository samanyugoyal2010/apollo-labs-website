/**
 * Supabase credentials. Both values are public by design — the publishable
 * key is safe in the browser and is protected by row level security, not by
 * secrecy. No service role key is read here, and none should be: it would
 * bypass RLS and must never reach client code.
 *
 * The full `process.env.X` expressions are written out literally so Next can
 * inline them at build time.
 */
export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

export function readSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

/** Same as `readSupabaseConfig`, but throws where a client is required. */
export function requireSupabaseConfig(): SupabaseConfig {
  const config = readSupabaseConfig();
  if (!config) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (and in the " +
        "Vercel project settings for deployed environments).",
    );
  }
  return config;
}
