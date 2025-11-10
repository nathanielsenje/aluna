import { CheckInForm } from '@/components/check-in-form';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            How are you feeling?
          </h1>
          <p className="text-muted-foreground mt-2">
            Take a moment to check in with your mind and body.
          </p>
        </header>
        <CheckInForm />
      </div>
    </div>
  );
}
