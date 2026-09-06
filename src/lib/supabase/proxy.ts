import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { readSupabaseConfig } from "./env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = readSupabaseConfig();

  // Public pages remain previewable before credentials are supplied. Protected
  // routes and auth actions handle missing configuration without a fake session.
  if (!config) return response;

  const { url, publishableKey } = config;
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser verifies the token with Supabase and refreshes stale sessions.
  await supabase.auth.getUser();
  return response;
}
