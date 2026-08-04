"use client";

import { useRef, type ChangeEvent } from "react";
import { ImagePlusIcon, ReplaceIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  accept?: string;
  className?: string;
  label?: string;
}

export function ImageUploadField({
  value,
  onChange,
  disabled,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  className,
  label = "Upload image",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(value);

  function openPicker() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={cn("w-fit", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={disabled}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        className={cn(
          "group relative flex size-28 items-center justify-center overflow-hidden rounded-none border border-dashed border-border bg-muted/30 transition-colors",
          "hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          hasImage && "border-solid",
        )}
        aria-label={hasImage ? "Replace image" : label}
      >
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="size-full object-cover"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <ReplaceIcon className="size-4" />
              <span className="text-xs font-medium">Replace</span>
            </span>
          </>
        ) : (
          <span className="flex flex-col items-center gap-1 px-2 text-center text-muted-foreground">
            <ImagePlusIcon className="size-5" />
            <span className="text-xs font-medium">Upload</span>
          </span>
        )}
      </button>
    </div>
  );
}
