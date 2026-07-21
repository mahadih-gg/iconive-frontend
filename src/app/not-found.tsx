import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="text-primary underline">
        Back to home
      </Link>
    </div>
  );
}
