import { Suspense } from 'react'
import { LoginForm } from '@/components/login/login-form'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* faint dot pattern */}
      <div className="pointer-events-none fixed inset-0 dot-pattern-dark opacity-60" />

      {/* blue glow top-right */}
      <div className="pointer-events-none fixed -top-32 -right-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative z-10 w-full max-w-sm">
        {/* logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-brand shadow-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <h1 className="font-display text-2xl tracking-tight text-foreground">
            Atomic<span className="gradient-text">Export</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">AI Export Operating System</p>
        </div>

        {/* card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Masuk ke akun Anda</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Gunakan kredensial yang telah diberikan tim Tetra Core.
            </p>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Atomic Export &copy; 2026 Tetra Core Team &middot; BI-OJK Hackathon
        </p>
      </div>
    </main>
  )
}
