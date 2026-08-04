"use client";

import { useEffect, useMemo, useState } from "react";
import { City, Country, State } from "country-state-city";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useProfile } from "@/hooks/useProfile";
import {
  addressBookSchema,
  type AddressBookFormValues,
} from "@/lib/validations/profileSchema";
import type { AddressBookEntry } from "@/types/address.type";
import { cn } from "@/lib/utils";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

function resolveCountryName(code: string) {
  return Country.getCountryByCode(code)?.name ?? code;
}

function resolveStateName(countryCode: string, stateCode: string) {
  return State.getStateByCodeAndCountry(stateCode, countryCode)?.name ?? stateCode;
}

function formatAddress(entry: AddressBookEntry) {
  const country = resolveCountryName(entry.country);
  const state = resolveStateName(entry.country, entry.state);
  return [entry.street, entry.city, state, country, entry.postalCode]
    .filter(Boolean)
    .join(", ");
}

export function AddressBook() {
  const { profile, updateProfile, isUpdating } = useProfile();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AddressBookEntry | null>(null);
  const [countryCode, setCountryCode] = useState("BD");
  const [stateCode, setStateCode] = useState("");

  const addresses = profile?.addresses ?? [];
  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );
  const cities = useMemo(() => {
    if (!countryCode) return [];
    const countryCities = City.getCitiesOfCountry(countryCode) ?? [];
    if (!stateCode) return countryCities;
    const stateCities = City.getCitiesOfState(countryCode, stateCode);
    if (stateCities.length > 0) return stateCities;
    return countryCities.filter((city) => city.stateCode === stateCode);
  }, [countryCode, stateCode]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressBookFormValues>({
    resolver: zodResolver(addressBookSchema),
    defaultValues: {
      label: "Home",
      street: "",
      country: "BD",
      state: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setCountryCode(editing.country);
      setStateCode(editing.state);
      reset({
        label: editing.label,
        street: editing.street,
        country: editing.country,
        state: editing.state,
        city: editing.city,
        postalCode: editing.postalCode,
      });
    } else {
      setCountryCode("BD");
      setStateCode("");
      reset({
        label: "Home",
        street: "",
        country: "BD",
        state: "",
        city: "",
        postalCode: "",
      });
    }
  }, [open, editing, reset]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(entry: AddressBookEntry) {
    setEditing(entry);
    setOpen(true);
  }

  async function onSubmit(values: AddressBookFormValues) {
    const nextEntry: AddressBookEntry = {
      id: editing?.id ?? `addr-${Date.now()}`,
      label: values.label,
      street: values.street,
      country: values.country,
      state: stateCode || values.state,
      city: values.city,
      postalCode: values.postalCode,
    };

    const nextAddresses = editing
      ? addresses.map((a) => (a.id === editing.id ? nextEntry : a))
      : [...addresses, nextEntry];

    try {
      await updateProfile({ addresses: nextAddresses });
      setOpen(false);
      setEditing(null);
    } catch {
      toast.error("Could not save address");
    }
  }

  return (
    <section className="mt-8">
      <h3 className="font-heading text-xl font-semibold tracking-tight">
        Address Book
      </h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {addresses.map((entry) => (
          <div
            key={entry.id}
            className="border border-primary-dark/15 bg-[#f3eee6]/50 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-heading text-sm font-semibold text-foreground">
                {entry.label}
              </p>
              <button
                type="button"
                onClick={() => openEdit(entry)}
                className="text-primary-dark transition-colors hover:text-primary"
                aria-label={`Edit ${entry.label}`}
              >
                <Pencil className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {formatAddress(entry)}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground uppercase">Country</dt>
                <dd className="font-medium text-foreground">
                  {resolveCountryName(entry.country)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase">State</dt>
                <dd className="font-medium text-foreground">
                  {resolveStateName(entry.country, entry.state)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase">City</dt>
                <dd className="font-medium text-foreground">{entry.city}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase">Postal</dt>
                <dd className="font-medium text-foreground">
                  {entry.postalCode}
                </dd>
              </div>
            </dl>
          </div>
        ))}

        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[160px] flex-col items-center justify-center gap-3 border border-dashed border-primary-dark/30 bg-[#f3eee6]/30 p-4 text-primary-dark transition-colors hover:border-primary hover:bg-primary/5"
        >
          <span className="font-heading text-sm font-semibold tracking-wide uppercase">
            Add Another Address
          </span>
          <span className="flex size-10 items-center justify-center bg-primary text-primary-foreground">
            <Plus className="size-5" />
          </span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border-primary-dark/20 bg-[#fffcf8] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editing ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="label" className={labelClassName}>
                Label
              </Label>
              <Input
                id="label"
                placeholder="Home, Work..."
                className={fieldClassName}
                {...register("label")}
              />
              {errors.label && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.label.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="street" className={labelClassName}>
                Street Address
              </Label>
              <Input
                id="street"
                placeholder="House, road, area"
                className={fieldClassName}
                {...register("street")}
              />
              {errors.street && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className={labelClassName}>Country</Label>
                <Select
                  value={countryCode}
                  onValueChange={(value) => {
                    setCountryCode(value);
                    setStateCode("");
                    setValue("country", value);
                    setValue("state", "");
                    setValue("city", "");
                  }}
                >
                  <SelectTrigger className={cn(fieldClassName, "w-full")}>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={labelClassName}>State</Label>
                <Select
                  value={stateCode}
                  onValueChange={(value) => {
                    setStateCode(value);
                    setValue("state", value);
                    setValue("city", "");
                  }}
                  disabled={states.length === 0}
                >
                  <SelectTrigger className={cn(fieldClassName, "w-full")}>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className={labelClassName}>City</Label>
                {cities.length > 0 ? (
                  <Select
                    value={watch("city")}
                    onValueChange={(value) => setValue("city", value)}
                  >
                    <SelectTrigger className={cn(fieldClassName, "w-full")}>
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem
                          key={`${c.name}-${c.latitude}`}
                          value={c.name}
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    placeholder="Enter city"
                    className={fieldClassName}
                    {...register("city")}
                  />
                )}
                {errors.city && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="postalCode" className={labelClassName}>
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  className={fieldClassName}
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="rounded-none"
                disabled={isUpdating}
              >
                {isUpdating ? <Spinner className="size-4" /> : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
