import { BadgeCheck, Star } from "lucide-react";

import { SectionHeader } from "@/components/common/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { BsQuote } from "react-icons/bs";

interface Review {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar?: string;
  initials: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Jessica M.",
    quote: "Amazing quality wigs. Highly recommend Iconive!",
    rating: 5,
    initials: "JM",
    avatar: "https://i.pravatar.cc/96?img=5",
  },
  {
    id: "2",
    name: "Aisha R.",
    quote: "Soft, natural, and looks so real. I get compliments every day.",
    rating: 5,
    initials: "AR",
    avatar: "https://i.pravatar.cc/96?img=9",
  },
  {
    id: "3",
    name: "Camille T.",
    quote: "Fast shipping and packaging was beautiful. Will order again!",
    rating: 5,
    initials: "CT",
    avatar: "https://i.pravatar.cc/96?img=20",
  },
  {
    id: "4",
    name: "Nina K.",
    quote: "The lace is undetectable. Best wig I've owned by far.",
    rating: 5,
    initials: "NK",
    avatar: "https://i.pravatar.cc/96?img=32",
  },
  {
    id: "5",
    name: "Priya S.",
    quote: "Customer service was lovely and the quality is premium.",
    rating: 5,
    initials: "PS",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  {
    id: "6",
    name: "Hannah L.",
    quote: "Feels luxurious and stays put all day. Absolutely love it.",
    rating: 5,
    initials: "HL",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
];

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "relative flex w-72 shrink-0 flex-col bg-primary/5 backdrop-blur-sm sm:w-80 p-4 md:p-6 border-2 border-primary-dark/40"
      )}
    >
      <span
        className="absolute text-primary/20 text-8xl top-0 left-0 blur-[1px] pointer-events-none select-none"
        aria-hidden
      >
        <BsQuote />
      </span>

      <p className="font-heading mt-2 min-h-16 leading-relaxed text-foreground text-sm md:text-base">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="mb-3 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-primary text-primary"
            strokeWidth={0}
            aria-hidden
          />
        ))}
      </div>

      <div className="mb-3 h-0.5 w-full bg-primary-dark/10" aria-hidden />

      <div className="flex items-center gap-3">
        <Avatar size="default" className="size-10">
          {review.avatar ? (
            <AvatarImage src={review.avatar} alt={review.name} />
          ) : null}
          <AvatarFallback className="bg-primary-dark text-xs font-semibold text-foreground">
            {review.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-semibold text-foreground">
            {review.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            Verified Buyer
            <BadgeCheck
              className="size-3.5 text-primary-dark"
              strokeWidth={2}
              aria-hidden
            />
          </p>
        </div>
      </div>
    </article>
  );
}

interface CustomerReviewsProps {
  className?: string;
}

export function CustomerReviews({ className }: CustomerReviewsProps) {
  return (
    <section
      className={cn(
        "overflow-hidden py-16 sm:py-20",
        className
      )}
    >
      <SectionHeader
        className="mx-auto mb-10 max-w-7xl px-4 sm:mb-12"
        label="Customer Love"
        heading="What People Are Saying"
        paragraph="Real feedback from our beautiful customers."
      />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-[#f7f4ef] to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-[#f7f4ef] to-transparent sm:w-24"
          aria-hidden
        />

        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.25rem]">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
