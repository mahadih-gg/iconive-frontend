"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/authSchema";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  async function onSubmit(values: LoginFormValues) {
    await login(values);
    if (searchParams.get("proceeedToCheckout") === "true") {
      router.push("/checkout");
      return;
    }
    if (searchParams.get("redirect") === "wholesale") {
      router.push("/wholesale");
      return;
    }
    router.push("/");
  }

  return (
    <div className="flex text-center">
      <div className="mx-auto my-8 flex w-full max-w-4xl flex-col bg-muted shadow-lg md:flex-row">
        <div className="relative flex w-full items-center justify-center p-4 md:w-1/2">
          <Image
            src="/Image/login/login.png"
            alt="Login"
            width={480}
            height={480}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="my-auto w-full p-4 text-start md:w-1/2 md:p-8">
          <p className="text-2xl text-foreground">Login Here</p>
          <p className="pt-1 text-sm">
            New to Iconive ?
            <Link
              href="/register"
              className="ms-2 border-b border-foreground pb-0.5 text-foreground no-underline"
            >
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 px-0 md:px-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="rounded-none border-0 border-b border-foreground bg-transparent"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="rounded-none border-0 border-b border-foreground bg-transparent"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoggingIn} className="my-4 px-10">
              {isLoggingIn ? <Spinner className="h-4 w-4" /> : "Log in"}
            </Button>
            <div className="flex justify-center gap-2 pt-2">
              <Image src="/Image/login/gmailicon.svg" alt="Gmail" width={28} height={28} />
              <Image src="/Image/login/facebookicon.svg" alt="Facebook" width={28} height={28} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
