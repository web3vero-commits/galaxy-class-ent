"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginInner() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-bg-panel border border-bg-border rounded-lg p-8">
        <p className="text-ink-faint text-xs tracking-[0.18em] uppercase mb-2">◆ Galaxy Class Entertainment</p>
        <h1 className="text-2xl font-extrabold mb-6">Radio Outreach CRM</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/queue" })}
          className="w-full bg-ink text-bg font-medium py-3 rounded-md hover:bg-white transition"
        >
          Sign in with Google
        </button>

        {error && (
          <p className="mt-6 text-sm text-red-400">
            {error === "AccessDenied"
              ? "This account isn't authorized. Use your @galaxyclassent.com address."
              : `Sign-in error: ${error}`}
          </p>
        )}

        <p className="mt-8 text-xs text-ink-muted">
          Restricted to authorized Galaxy Class accounts. Contact Mike Foley if you need access.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
