"use client";

import { useRef, type ChangeEvent, type DragEvent } from "react";
import { ImagePlusIcon, ReplaceIcon, UploadIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  accept?: string;
  className?: string;
  label?: string;
  variant?: "default" | "dropzone";
}

export function ImageUploadField({
  value,
  onChange,
  disabled,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  className,
  label = "Upload image",
  variant = "default",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(value);
  const isDropzone = variant === "dropzone";

  function openPicker() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    readFile(file);
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    readFile(file);
  }

  return (
    <div className={cn(isDropzone ? "w-full" : "w-fit", className)}>
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
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        disabled={disabled}
        className={cn(
          "group relative flex items-center justify-center overflow-hidden rounded-none border border-dashed border-border bg-muted/30 transition-colors",
          "hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          hasImage && "border-solid",
          isDropzone ? "min-h-36 w-full p-6" : "size-28",
        )}
        aria-label={hasImage ? "Replace image" : label}
      >
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className={cn(
                "object-cover",
                isDropzone ? "absolute inset-0 size-full" : "size-full",
              )}
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <ReplaceIcon className="size-4" />
              <span className="text-xs font-medium">Replace</span>
            </span>
          </>
        ) : (
          <span className="flex flex-col items-center gap-1 px-2 text-center text-muted-foreground">
            {isDropzone ? (
              <UploadIcon className="size-6" />
            ) : (
              <ImagePlusIcon className="size-5" />
            )}
            <span className="text-xs font-medium">{label}</span>
            {isDropzone ? (
              <span className="text-[11px] text-muted-foreground/80">
                Click or drag and drop
              </span>
            ) : null}
          </span>
        )}
      </button>
    </div>
  );
}
