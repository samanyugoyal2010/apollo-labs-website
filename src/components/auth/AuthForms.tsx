"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordReset,
  signIn,
  signUp,
  updatePassword,
  type AuthState,
} from "@/app/auth/actions";
import { Button, Arrow } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

const initialState: AuthState = {};

function FormMessage({ state }: { state: AuthState }) {
  if (!state.message) return null;
  return (
    <p
      className={`border px-4 py-3 text-[0.9375rem] leading-snug ${
        state.success
          ? "border-paper/20 bg-paper/[0.04] text-paper-dim"
          : "border-signal/40 bg-signal/[0.07] text-signal-text"
      }`}
      role={state.success ? "status" : "alert"}
    >
      {state.message}
    </p>
  );
}

export function JoinForm() {
  const [state, action, pending] = useActionState(signUp, initialState);
  return (
    <form action={action} className="mt-10 flex flex-col gap-7" noValidate>
      <Field label="Full name" name="name" placeholder="Your name" autoComplete="name" required defaultValue={state.values?.name} error={state.errors?.name} />
      <Field label="Email" type="email" name="email" placeholder="you@school.edu" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
      <Field label="Password" type="password" name="password" placeholder="At least 8 characters" autoComplete="new-password" required minLength={8} error={state.errors?.password} />
      <Field label="Graduation year" type="number" name="graduationYear" placeholder="2028" min={2024} max={2040} required defaultValue={state.values?.graduationYear} error={state.errors?.graduationYear} />
      <FormMessage state={state} />
      <div className="mt-2">
        <Button type="submit" busy={pending} className="group w-full">
          {pending ? "Creating account…" : "Create Account"} {!pending && <Arrow />}
        </Button>
      </div>
    </form>
  );
}

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initialState);
  return (
    <form action={action} className="mt-10 flex flex-col gap-7" noValidate>
      <Field
        label="Email"
        type="email"
        name="email"
        placeholder="you@school.edu"
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        error={state.errors?.email}
      />
      <Field
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        error={state.errors?.password}
      />
      <FormMessage state={state} />
      <div className="mt-2 flex flex-col gap-4">
        <Button type="submit" busy={pending} className="group w-full">
          {pending ? "Signing in…" : "Sign In"} {!pending && <Arrow />}
        </Button>
        <Link href="/forgot-password" className="link-reveal self-start text-[0.8125rem] text-muted transition-colors hover:text-paper">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);
  return (
    <form action={action} className="mt-10 flex flex-col gap-7" noValidate>
      <Field label="Email" type="email" name="email" placeholder="you@school.edu" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
      <FormMessage state={state} />
      <Button type="submit" busy={pending} className="group w-full">
        {pending ? "Sending link…" : "Send Reset Link"} {!pending && <Arrow />}
      </Button>
    </form>
  );
}

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, initialState);
  return (
    <form action={action} className="mt-10 flex flex-col gap-7" noValidate>
      <Field label="New password" type="password" name="password" autoComplete="new-password" required minLength={8} error={state.errors?.password} />
      <Field label="Confirm password" type="password" name="confirmPassword" autoComplete="new-password" required minLength={8} error={state.errors?.confirmPassword} />
      <FormMessage state={state} />
      <Button type="submit" busy={pending} className="group w-full">
        {pending ? "Updating password…" : "Update Password"} {!pending && <Arrow />}
      </Button>
    </form>
  );
}
