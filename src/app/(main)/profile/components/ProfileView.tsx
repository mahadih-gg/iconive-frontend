"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/profileSchema";
import { cn } from "@/lib/utils";
import { formatOrderDate } from "@/utils/order-tracking";

import { AddressBook } from "./AddressBook";
import { ProfileShell } from "./ProfileShell";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
] as const;

const NONE_GENDER = "__none__";

function normalizeGender(value?: string) {
  if (!value?.trim()) return "";
  const match = GENDER_OPTIONS.find(
    (option) => option.toLowerCase() === value.trim().toLowerCase(),
  );
  return match ?? "";
}

export function ProfileView() {
  const { user } = useAuth();
  const { profile, updateProfile, isUpdating } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const gender = watch("gender");

  useEffect(() => {
    const data = profile ?? user;
    if (data) {
      reset({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        gender: normalizeGender(data.gender),
      });
    }
  }, [profile, user, reset]);

  const displayDob = profile?.dateOfBirth
    ? formatOrderDate(profile.dateOfBirth)
    : "—";

  return (
    <ProfileShell title="My Profile">
      <div className="border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-6">
        <form
          onSubmit={handleSubmit((values) => updateProfile(values))}
          className="space-y-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className={labelClassName}>Client Name</p>
              <Input
                className={cn(fieldClassName, "font-semibold")}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <p className={labelClassName}>E-mail Address</p>
              <div className="relative">
                <Input
                  className={cn(fieldClassName, "pr-10")}
                  disabled
                  {...register("email")}
                />
                <Pencil className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-primary-dark/50" />
              </div>
            </div>

            <div>
              <p className={labelClassName}>Mobile Number</p>
              <div className="relative">
                <Input
                  className={cn(fieldClassName, "pr-10")}
                  {...register("phone")}
                />
                <Pencil className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-primary-dark" />
              </div>
            </div>

            <div>
              <p className={labelClassName}>Date of Birth</p>
              <Input
                type="date"
                className={fieldClassName}
                {...register("dateOfBirth")}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Display: {displayDob}
              </p>
            </div>

            <div>
              <p className={labelClassName}>Gender</p>
              <Select
                value={gender || NONE_GENDER}
                onValueChange={(value) =>
                  setValue("gender", value === NONE_GENDER ? "" : value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className={cn(fieldClassName, "w-full")}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value={NONE_GENDER}>Select gender</SelectItem>
                  {GENDER_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address" className={labelClassName}>
                Default Address Note
              </Label>
              <Input
                id="address"
                placeholder="Optional short note"
                className={fieldClassName}
                {...register("address")}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="cta"
            size="ctaSm"
            disabled={isUpdating || !isDirty}
          >
            {isUpdating ? <Spinner className="size-4" /> : "Save Changes"}
          </Button>
        </form>

        <div className="mt-8 border-t border-primary-dark/15 pt-2">
          <AddressBook />
        </div>
      </div>
    </ProfileShell>
  );
}
