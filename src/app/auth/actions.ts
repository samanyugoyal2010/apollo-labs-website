"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { readSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  errors?: Partial<Record<"name" | "email" | "password" | "graduationYear" | "confirmPassword", string>>;
  message?: string;
  success?: boolean;
  /** Echoed back so a failed submit does not wipe what was typed. Passwords
      are deliberately never echoed. */
  values?: Partial<Record<"name" | "email" | "graduationYear", string>>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const unavailableMessage =
  "Account access is not configured for this site yet. Please try again later.";

/**
 * Supabase surfaces auth failures as raw API strings ("Email address ... is
 * invalid", "User already registered"). Those leak implementation detail and
 * read badly, so map the ones users actually hit onto our own copy and keep a
 * neutral fallback for everything else.
 */
function authMessage(error: { message: string; code?: string; status?: number }): string {
  const code = error.code ?? "";
  const raw = error.message.toLowerCase();

  if (code === "user_already_exists" || raw.includes("already registered")) {
    return "An account with that email already exists. Try signing in instead.";
  }
  if (code === "weak_password" || raw.includes("password should be")) {
    return "That password is too weak. Use at least 8 characters, mixing letters and numbers.";
  }
  if (code === "email_address_invalid" || raw.includes("is invalid")) {
    return "That email address was rejected. Check it, or try a different one.";
  }
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || error.status === 429) {
    return "Too many attempts. Wait a minute and try again.";
  }
  if (code === "email_not_confirmed" || raw.includes("not confirmed")) {
    return "Confirm your email first — check your inbox for the link we sent.";
  }
  if (code === "signup_disabled") {
    return "New accounts are disabled right now. Get in touch if you need access.";
  }
  return "Something went wrong on our end. Try again in a moment.";
}

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

async function siteOrigin() {
  const requestHeaders = await headers();
  return requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function signUp(_state: AuthState, formData: FormData): Promise<AuthState> {
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const graduationYearRaw = value(formData, "graduationYear");
  const graduationYear = Number(graduationYearRaw);
  const errors: NonNullable<AuthState["errors"]> = {};

  if (name.length < 2) errors.name = "Enter your full name.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) errors.password = "Use at least 8 characters.";
  if (!Number.isInteger(graduationYear) || graduationYear < 2024 || graduationYear > 2040) {
    errors.graduationYear = "Enter a graduation year from 2024 to 2040.";
  }
  const values = { name, email, graduationYear: graduationYearRaw };
  if (Object.keys(errors).length) return { errors, values };

  if (!readSupabaseConfig()) return { message: unavailableMessage, values };

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, graduation_year: graduationYear },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) return { message: authMessage(error), values };
  if (data.session) redirect("/dashboard");

  return {
    success: true,
    message: "Check your email to confirm your account, then sign in.",
  };
}

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const errors: NonNullable<AuthState["errors"]> = {};

  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  const values = { email };
  if (Object.keys(errors).length) return { errors, values };

  if (!readSupabaseConfig()) return { message: unavailableMessage, values };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Unconfirmed accounts need their own message; anything else stays vague
    // so the form cannot be used to probe which emails are registered.
    const unconfirmed =
      error.code === "email_not_confirmed" ||
      error.message.toLowerCase().includes("not confirmed");
    return {
      message: unconfirmed
        ? authMessage(error)
        : "The email or password you entered is incorrect.",
      values,
    };
  }

  redirect("/dashboard");
}

export async function requestPasswordReset(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = value(formData, "email").toLowerCase();
  if (!emailPattern.test(email)) return { errors: { email: "Enter a valid email address." } };
  if (!readSupabaseConfig()) return { message: unavailableMessage, values: { email } };

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });

  if (error) return { message: authMessage(error), values: { email } };
  return {
    success: true,
    message: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function updatePassword(_state: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const errors: NonNullable<AuthState["errors"]> = {};

  if (password.length < 8) errors.password = "Use at least 8 characters.";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
  if (Object.keys(errors).length) return { errors };

  if (!readSupabaseConfig()) return { message: unavailableMessage };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { message: authMessage(error) };

  redirect("/dashboard");
}

export async function signOut() {
  if (!readSupabaseConfig()) redirect("/");

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
