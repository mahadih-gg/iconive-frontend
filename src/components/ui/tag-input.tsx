"use client";

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatTags, parseTags } from "@/utils/tags";

function addTag(tags: string[], tag: string): string[] {
  const normalized = tag.trim();
  if (!normalized) return tags;

  const exists = tags.some(
    (entry) => entry.toLowerCase() === normalized.toLowerCase(),
  );
  if (exists) return tags;

  return [...tags, normalized];
}

interface TagInputProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
}

export function TagInput({
  id,
  value = "",
  onChange,
  placeholder = "Type and press Enter",
  disabled = false,
  className,
  "aria-invalid": ariaInvalid,
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const tags = parseTags(value);

  function updateTags(nextTags: string[]) {
    onChange?.(formatTags(nextTags));
  }

  function commitInput(rawValue = inputValue) {
    const nextTags = addTag(tags, rawValue);
    if (nextTags.length === tags.length) {
      setInputValue("");
      return;
    }

    updateTags(nextTags);
    setInputValue("");
  }

  function removeTag(index: number) {
    updateTags(tags.filter((_, tagIndex) => tagIndex !== index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitInput();
      return;
    }

    if (event.key === "Backspace" && !inputValue && tags.length > 0) {
      updateTags(tags.slice(0, -1));
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text");
    if (!pasted.includes(",")) return;

    event.preventDefault();

    const pastedTags = parseTags(pasted);
    if (pastedTags.length === 0) return;

    let nextTags = [...tags];
    for (const tag of pastedTags) {
      nextTags = addTag(nextTags, tag);
    }

    updateTags(nextTags);
    setInputValue("");
  }

  return (
    <div
      aria-invalid={ariaInvalid}
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-none border border-input bg-transparent px-2 py-1.5 text-sm transition-colors outline-none focus-within:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="secondary"
          className="gap-1 rounded-none pr-1"
        >
          {tag}
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${tag}`}
            className="rounded-none p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none"
            onClick={(event) => {
              event.stopPropagation();
              removeTag(index);
            }}
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        placeholder={tags.length === 0 ? placeholder : undefined}
        className="min-w-30 flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => commitInput()}
        onPaste={handlePaste}
      />
    </div>
  );
}
