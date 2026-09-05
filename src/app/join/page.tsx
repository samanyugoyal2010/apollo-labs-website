import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { JoinForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Join Apollo",
  description: "Join Apollo Labs and start publishing your research.",
};

const DISCORD_INVITE = "https://discord.gg/pvgqDxX2NE";

export default function JoinPage() {
  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Start something worth publishing."
      statement="Bring an idea. Leave with something that has your name on it."
      description={
        <p>
          Create your Apollo account with your name, email, password, and
          graduation year. Confirm your email if prompted, then enter your
          member workspace.
        </p>
      }
      accessDetails={[
        { label: "Verification", value: "Email may be required" },
        { label: "Continue to", value: "Member workspace" },
      ]}
      workspaceItems={["Project overview", "Team directory", "Account snapshot"]}
      footer={
        <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Already a member?{" "}
            <Link
              href="/signin"
              className="link-reveal text-paper transition-colors hover:text-signal-bright"
            >
              Sign in
            </Link>
          </p>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            className="link-reveal text-paper transition-colors hover:text-signal-bright"
          >
            Join the Discord
          </a>
        </div>
      }
    >
      <JoinForm />
    </AuthLayout>
  );
}
