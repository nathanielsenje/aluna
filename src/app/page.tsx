
'use client';

import { CheckInForm } from '@/components/check-in-form';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is logged in, show them the check-in form.
    // Otherwise, they will see the login prompt.
  }, [user, router]);

  if (isUserLoading) {
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-5xl sm:text-7xl tracking-tighter text-foreground mb-4">Welcome to Aluna</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sign in anonymously to begin your wellness journey. Your data will be saved securely and privately to your account.
          </p>
        </div>
        <Button onClick={() => initiateAnonymousSignIn(auth)} size="lg">
          Sign In Anonymously
        </Button>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-background">
      <CheckInForm />
    </main>
  );
}
