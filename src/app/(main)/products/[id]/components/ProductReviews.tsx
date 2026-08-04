"use client";

import {
  BadgeCheck,
  ChevronDown,
  ImageIcon,
  Plus,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { RatingStars } from "@/components/common/RatingStars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  getReviewStats,
  PRODUCT_REVIEWS,
  type ProductReview,
} from "@/data/reviews";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  productName?: string;
  className?: string;
}

interface ReviewImagePreview {
  id: string;
  file: File;
  url: string;
}

const MAX_REVIEW_IMAGES = 5;
const MAX_REVIEW_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_REVIEW_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

interface ExpandableTextProps {
  text: string;
  lines?: number;
  className?: string;
}

function ExpandableText({
  text,
  lines = 2,
  className,
}: ExpandableTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;

      // Temporarily remove line-clamp so scrollHeight is the full rendered height.
      const wasClamped = el.classList.contains("line-clamp-2");
      if (wasClamped) el.classList.remove("line-clamp-2");

      const styles = getComputedStyle(el);
      let lineHeight = Number.parseFloat(styles.lineHeight);
      if (Number.isNaN(lineHeight)) {
        const fontSize = Number.parseFloat(styles.fontSize) || 14;
        lineHeight = fontSize * 1.625;
      }

      const fullHeight = el.scrollHeight;
      const maxCollapsedHeight = lineHeight * lines;
      setIsOverflowing(fullHeight > maxCollapsedHeight + 1);

      if (wasClamped) el.classList.add("line-clamp-2");
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, lines]);

  return (
    <div className="relative mt-1">
      <p
        ref={textRef}
        className={cn(
          "text-sm leading-relaxed text-muted-foreground",
          !expanded && "line-clamp-2",
          className,
        )}
      >
        {text}
        {expanded && isOverflowing ? (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline text-xs font-semibold tracking-wide text-primary-dark transition-colors hover:text-primary"
            >
              See less
            </button>
          </>
        ) : null}
      </p>

      {!expanded && isOverflowing ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="absolute right-0 bottom-0 bg-linear-to-l from-[#fffcf8] from-45% to-transparent pl-10 text-xs font-semibold tracking-wide text-primary-dark transition-colors hover:text-primary"
        >
          See more
        </button>
      ) : null}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const [helpful, setHelpful] = useState(review.helpful ?? 0);
  const [voted, setVoted] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [imagesOpen, setImagesOpen] = useState(false);
  const imageCount = review.images?.length ?? 0;
  const hasImages = imageCount > 0;

  return (
    <>
      <article className="border-b border-primary-dark/15 py-4 last:border-b-0 sm:py-5">
        <div className="flex items-start gap-3">
          <Avatar className="size-9 shrink-0">
            {review.avatar ? (
              <AvatarImage src={review.avatar} alt={review.name} />
            ) : null}
            <AvatarFallback className="bg-primary/15 font-heading text-[10px] font-semibold text-primary-dark">
              {review.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                {review.verified ? (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-primary-dark">
                    <BadgeCheck className="size-3.5 fill-primary text-primary-foreground" />
                    Verified
                  </span>
                ) : null}
              </div>
              <time className="shrink-0 text-xs text-muted-foreground">
                {review.date}
              </time>
            </div>

            {review.location ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {review.location}
              </p>
            ) : null}

            <div className="mt-2">
              <RatingStars rating={review.rating} size="sm" />
            </div>

            <h3 className="font-heading mt-1.5 text-sm font-semibold tracking-tight text-foreground">
              {review.title}
            </h3>
            <ExpandableText text={review.comment} lines={2} />

            {hasImages ? (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setImagesOpen((open) => !open)}
                  aria-expanded={imagesOpen}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase transition-colors hover:text-primary"
                >
                  <ImageIcon className="size-3.5" />
                  {imagesOpen
                    ? "Hide photos"
                    : `Show photos (${imageCount})`}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      imagesOpen && "rotate-180",
                    )}
                  />
                </button>

                {imagesOpen ? (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {review.images!.map((src) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox(src)}
                        className="relative size-14 overflow-hidden border border-primary-dark/20 transition-opacity hover:opacity-90 sm:size-16"
                      >
                        <Image
                          src={src}
                          alt={`Review photo by ${review.name}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2 h-8 w-fit gap-1.5 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                if (voted) return;
                setHelpful((n) => n + 1);
                setVoted(true);
              }}
              disabled={voted}
            >
              <ThumbsUp className={cn("size-3.5", voted && "fill-current")} />
              Helpful ({helpful})
            </Button>
          </div>
        </div>
      </article>

      <Dialog open={Boolean(lightbox)} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-lg overflow-hidden rounded-none border-primary-dark/20 p-0">
          <DialogTitle className="sr-only">Review photo</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged customer review photo
          </DialogDescription>
          {lightbox ? (
            <div className="relative aspect-square w-full bg-[#f3eee6]">
              <Image
                src={lightbox}
                alt="Customer review photo"
                fill
                className="object-contain"
                sizes="512px"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductReviews({
  productName = "this product",
  className,
}: ProductReviewsProps) {
  const stats = useMemo(() => getReviewStats(PRODUCT_REVIEWS), []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<ReviewImagePreview[]>([]);
  const [writeOpen, setWriteOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<ReviewImagePreview[]>([]);

  imagesRef.current = images;

  function revokeImages(previews: ReviewImagePreview[]) {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }

  function resetForm() {
    setName("");
    setTitle("");
    setComment("");
    setFormRating(5);
    setImages((prev) => {
      revokeImages(prev);
      return [];
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleWriteOpenChange(open: boolean) {
    setWriteOpen(open);
    if (!open) resetForm();
  }

  function handleImagesSelected(fileList: FileList | null) {
    if (!fileList?.length) return;

    const remaining = MAX_REVIEW_IMAGES - images.length;
    if (remaining <= 0) {
      toast.error(`You can upload up to ${MAX_REVIEW_IMAGES} images`);
      return;
    }

    const next: ReviewImagePreview[] = [];
    const selected = Array.from(fileList).slice(0, remaining);

    for (const file of selected) {
      if (!ACCEPTED_REVIEW_IMAGE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image type`);
        continue;
      }
      if (file.size > MAX_REVIEW_IMAGE_BYTES) {
        toast.error(`${file.name} must be under 5MB`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        url: URL.createObjectURL(file),
      });
    }

    if (next.length > 0) setImages((prev) => [...prev, ...next]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((image) => image.id !== id);
    });
  }

  useEffect(() => {
    return () => {
      revokeImages(imagesRef.current);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const photoNote =
      images.length > 0
        ? ` with ${images.length} photo${images.length > 1 ? "s" : ""}`
        : "";
    toast.success(
      `Thank you! Your review${photoNote} has been submitted for moderation.`,
    );
    handleWriteOpenChange(false);
  }

  return (
    <section
      id="reviews"
      className={cn(
        "scroll-mt-24 border-2 border-primary-dark/20 bg-[#fffcf8]",
        className,
      )}
    >
      <div className="border-b border-primary-dark/15 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              Customer Love
            </p>
            <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Reviews
            </h2>
          </div>
          <Button
            type="button"
            variant="ctaOutline"
            size="ctaSm"
            className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
            onClick={() => setWriteOpen(true)}
          >
            Write a Review
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex shrink-0 flex-col items-start gap-1">
            <p className="font-heading text-4xl font-semibold tracking-tight text-foreground">
              {stats.average.toFixed(1)}
            </p>
            <RatingStars rating={stats.average} size="md" />
            <p className="text-xs text-muted-foreground">
              {stats.total} reviews
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {stats.distribution.map(({ stars, count, percent }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="flex w-8 shrink-0 items-center gap-0.5 text-xs font-medium text-foreground">
                  {stars}
                  <Star className="size-3 fill-primary text-primary" />
                </span>
                <Progress value={percent} className="h-1.5 flex-1" />
                <span className="w-5 shrink-0 text-right text-[11px] text-muted-foreground tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="h-80 sm:h-96">
        <ul className="px-4 sm:px-5">
          {PRODUCT_REVIEWS.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </ScrollArea>

      <Dialog open={writeOpen} onOpenChange={handleWriteOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border-primary-dark/20 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with {productName}. Reviews are moderated
              before publishing.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Your rating</Label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormRating(value)}
                      aria-label={`${value} stars`}
                      className="p-0.5"
                    >
                      <Star
                        className={cn(
                          "size-7 transition-colors",
                          value <= formRating
                            ? "fill-primary text-primary"
                            : "text-primary/30",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-name">Name</Label>
              <Input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-title">Title</Label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience"
                className="rounded-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-comment">Review</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you liked..."
                rows={4}
                className="rounded-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="review-images">Photos</Label>
                <span className="text-xs text-muted-foreground">
                  {images.length}/{MAX_REVIEW_IMAGES} · JPG, PNG, WEBP · max 5MB
                </span>
              </div>

              <input
                ref={fileInputRef}
                id="review-images"
                type="file"
                accept={ACCEPTED_REVIEW_IMAGE_TYPES.join(",")}
                multiple
                className="sr-only"
                onChange={(e) => handleImagesSelected(e.target.files)}
              />

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden border border-primary-dark/20 bg-[#f3eee6]"
                  >
                    <img
                      src={image.url}
                      alt={image.file.name}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      aria-label={`Remove ${image.file.name}`}
                      className="absolute top-1 right-1 flex size-6 items-center justify-center bg-foreground/80 text-background transition-colors hover:bg-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}

                {images.length < MAX_REVIEW_IMAGES ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-1.5 border border-dashed border-primary-dark/30 bg-[#f3eee6]/30 text-primary-dark transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <Plus className="size-5" />
                    <span className="font-heading text-[10px] font-semibold tracking-wide uppercase">
                      Add photo
                    </span>
                  </button>
                ) : null}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="rounded-none"
                onClick={() => handleWriteOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="cta" size="ctaSm">
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
