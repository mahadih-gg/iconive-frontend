import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex w-full flex-col items-center justify-center gap-5 bg-background"
      role="status"
      aria-label="Loading"
    >
      <div className="loading-brand relative flex size-[4.5rem] items-center justify-center sm:size-20">
        <span
          className="loading-ring absolute inset-0 rounded-full border-2 border-primary/25 border-t-primary"
          aria-hidden
        />
        <div className="relative z-10 flex size-14 items-center justify-center overflow-hidden rounded-full bg-black sm:size-16">
          <Image
            src="/Image/logo/Img 3.png"
            alt=""
            width={56}
            height={56}
            className="size-11 object-contain sm:size-12"
            priority
          />
        </div>
      </div>
      <p className="font-brand loading-brand-text text-sm font-medium tracking-[0.22em] text-foreground">
        ICONIVE
      </p>
    </div>
  );
}
