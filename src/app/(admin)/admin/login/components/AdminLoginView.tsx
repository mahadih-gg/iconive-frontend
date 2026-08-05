"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import { ADMIN_DEMO } from "@/dummy/admin/auth.dummy";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export function AdminLoginView() {
  const router = useRouter();
  const { login, isAuthenticated, isLoggingIn } = useAdminAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: ADMIN_DEMO.email, password: ADMIN_DEMO.password },
  });

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, router]);

  async function onSubmit(values: FormValues) {
    await login({ email: values.email, password: values.password });
    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md border border-border bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-2">
          <p className="font-brand text-2xl font-semibold tracking-tight">
            Iconive Admin
          </p>
          <p className="text-sm text-muted-foreground">
            Sign in with your admin credentials. Demo: {ADMIN_DEMO.email} /{" "}
            {ADMIN_DEMO.password}
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="admin-email">Email</FieldLabel>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="admin-password">Password</FieldLabel>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!form.formState.errors.password}
                {...form.register("password")}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Button type="submit" disabled={isLoggingIn} className="w-full">
              {isLoggingIn ? <Spinner data-icon="inline-start" /> : null}
              Sign in
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
