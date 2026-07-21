"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { customProductsService } from "@/services/customProducts.service";

const BASE_MATERIALS = ["Mono Base", "Lace Base", "Skin Base", "Silk Base", "Mix Base"];
const HAIR_MATERIALS = [
  "Remy Hair",
  "Virgin Hair",
  "Synthetic Hair",
  "remy+synthetic Mixed",
];
const HAIR_DIRECTIONS = [
  "Free style",
  "Left parting",
  "Right parting",
  "Center parting",
  "Left crown",
  "right crown",
  "center crown",
  "Brush back",
];

export function CustomizeView() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    baseMaterial: "",
    hairMaterial: "",
    hairDirection: "",
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.baseMaterial) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      setLoading(true);
      await customProductsService.create(form);
      toast.success("Custom request submitted");
      setForm({
        name: "",
        email: "",
        phone: "",
        baseMaterial: "",
        hairMaterial: "",
        hairDirection: "",
        notes: "",
      });
    } catch {
      toast.error("Could not submit custom request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Image
          src="/Image/custom/custombanner.webp"
          alt="Customize"
          width={1600}
          height={420}
          className="h-auto w-full"
          priority
        />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-10 text-start">
        <h1 className="mb-4 text-3xl font-bold">Customize Your Wig</h1>
        <p className="mb-8 text-muted-foreground">
          Tell us your preferred base, hair material, and style. Our team will follow up
          with a custom quote.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div>
            <Label>Base Material *</Label>
            <Select
              value={form.baseMaterial}
              onValueChange={(v) => update("baseMaterial", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select base" />
              </SelectTrigger>
              <SelectContent>
                {BASE_MATERIALS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Hair Material</Label>
            <Select
              value={form.hairMaterial}
              onValueChange={(v) => update("hairMaterial", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hair material" />
              </SelectTrigger>
              <SelectContent>
                {HAIR_MATERIALS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Hair Direction</Label>
            <Select
              value={form.hairDirection}
              onValueChange={(v) => update("hairDirection", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                {HAIR_DIRECTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : "Submit Custom Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
