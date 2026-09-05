import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { UpdatePasswordForm } from "@/components/auth/AuthForms";
import { readSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Choose a New Password",
};

export default async function UpdatePasswordPage() {
  if (!readSupabaseConfig()) redirect("/forgot-password");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/forgot-password");

  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Choose a new password."
      statement="Secure the account, then get back to the work."
      footer={<p className="text-sm text-muted">Use at least eight characters.</p>}
    >
      <UpdatePasswordForm />
    </AuthLayout>
  );
}
