"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="p-8 text-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          type="button"
          className="mt-4 rounded-md border px-4 py-2 text-sm"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
