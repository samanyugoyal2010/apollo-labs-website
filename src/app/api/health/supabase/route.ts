import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { readSupabaseConfig } from "@/lib/supabase/env";

/**
 * Connection check for the Supabase wiring.
 *
 * Deliberately does not query any table — none exist yet. It proves the
 * credentials are present, the server client constructs against this
 * request's cookies, and the auth helper responds. Returns JSON only, so no
 * visible UI is affected.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const config = readSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        reason:
          "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = await createClient();
    // Reads the session from cookies; no table access, no network round trip.
    const { error } = await supabase.auth.getSession();
    if (error) throw error;

    return NextResponse.json({
      ok: true,
      configured: true,
      clientInstantiated: true,
      // Host only — never echo the key back.
      projectHost: new URL(config.url).host,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        clientInstantiated: false,
        reason: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
