"use client";

import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import { ImageUploadField } from "@/components/admin/shared/ImageUploadField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiImageUploadFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  max?: number;
  className?: string;
}

export function MultiImageUploadField({
  value,
  onChange,
  disabled,
  max = 8,
  className,
}: MultiImageUploadFieldProps) {
  const [slots, setSlots] = useState<string[]>(() =>
    value.length > 0 ? value : [""],
  );

  useEffect(() => {
    setSlots(value.length > 0 ? value : [""]);
  }, [value]);

  function commit(nextSlots: string[]) {
    setSlots(nextSlots.length > 0 ? nextSlots : [""]);
    onChange(nextSlots.filter(Boolean));
  }

  function updateAt(index: number, next: string) {
    const nextSlots = [...slots];
    nextSlots[index] = next;
    commit(nextSlots);
  }

  function removeAt(index: number) {
    commit(slots.filter((_, i) => i !== index));
  }

  function addSlot() {
    if (slots.filter(Boolean).length >= max) return;
    setSlots([...slots.filter(Boolean), ""]);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-3">
        {slots.map((image, index) => (
          <div key={`image-slot-${index}`} className="relative">
            <ImageUploadField
              value={image}
              onChange={(next) => updateAt(index, next)}
              disabled={disabled}
              label="Upload"
            />
            {image || slots.length > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 size-6 rounded-none border bg-background"
                disabled={disabled}
                onClick={() => removeAt(index)}
                aria-label="Remove image"
              >
                <XIcon />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
      {slots.filter(Boolean).length < max ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit rounded-none"
          disabled={disabled}
          onClick={addSlot}
        >
          <PlusIcon data-icon="inline-start" />
          Add image
        </Button>
      ) : null}
    </div>
  );
}
