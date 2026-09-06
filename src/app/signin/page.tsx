import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Apollo Labs member workspace.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      showRocket
      eyebrow="Member Access"
      title="Welcome back. Your work is waiting."
      statement="Pick up the work where you left it — with every project, collaborator, and next step in view."
      description={
        <p>
          Enter the email and password connected to your Apollo account to
          continue to your workspace.
        </p>
      }
      accessDetails={[
        { label: "Enter", value: "Email + password" },
        { label: "Continue to", value: "Your workspace" },
      ]}
      workspaceItems={["Project overview", "Team directory", "Account snapshot"]}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <p className="text-muted">
            No account yet?{" "}
            <Link
              href="/join"
              className="link-reveal text-paper transition-colors hover:text-signal-bright"
            >
              Join Apollo
            </Link>
          </p>
          <Link
            href="/explore"
            className="link-reveal text-faint transition-colors hover:text-paper"
          >
            Browse public work
          </Link>
        </div>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
