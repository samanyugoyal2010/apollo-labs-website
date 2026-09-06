import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Apollo Labs password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Reset your password."
      statement="A forgotten password should never cost you your work."
      footer={
        <p className="text-sm text-muted">
          Remembered it?{" "}
          <Link href="/signin" className="link-reveal text-paper transition-colors hover:text-signal-bright">
            Sign in
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
