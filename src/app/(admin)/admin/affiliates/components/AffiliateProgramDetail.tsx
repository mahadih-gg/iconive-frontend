"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { FieldGroup, FieldSeparator, FieldTitle } from "@/components/ui/field";
import type { AdminAffiliateProgram } from "@/types/admin";

interface AffiliateProgramDetailProps {
  program: AdminAffiliateProgram;
}

export function AffiliateProgramDetail({
  program,
}: AffiliateProgramDetailProps) {
  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between gap-3">
        <FieldTitle>Program details</FieldTitle>
        <Badge
          variant={program.isActive ? "default" : "outline"}
          className="rounded-none"
        >
          {program.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Label</dt>
          <dd className="text-right font-medium">{program.label}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Title</dt>
          <dd className="text-right">{program.title}</dd>
        </div>

        <FieldSeparator />

        <div className="flex flex-col gap-1.5">
          <dt className="text-muted-foreground">Description</dt>
          <dd className="rounded-none border border-border bg-muted/30 p-3 leading-relaxed whitespace-pre-wrap">
            {program.description}
          </dd>
        </div>

        {program.image ? (
          <div className="flex flex-col gap-1.5">
            <dt className="text-muted-foreground">Image</dt>
            <dd className="relative aspect-video overflow-hidden border border-border bg-muted">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </dd>
          </div>
        ) : null}
      </dl>
    </FieldGroup>
  );
}
