"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterView() {
  const router = useRouter();
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    await registerUser({
      name: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    });
    router.push("/");
  }

  return (
    <div className="flex text-center">
      <div className="mx-auto my-8 flex w-full max-w-4xl flex-col bg-muted shadow-lg md:flex-row">
        <div className="relative flex w-full items-center justify-center p-4 md:w-1/2">
          <Image
            src="/Image/login/signup.png"
            alt="Sign up"
            width={480}
            height={480}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="my-auto w-full p-4 text-start md:w-1/2 md:p-8">
          <p className="text-2xl text-foreground">Create Your Account</p>
          <p className="pt-1 text-sm">
            Already a member?{" "}
            <Link
              href="/login"
              className="ms-2 border-b border-foreground pb-0.5 text-foreground no-underline"
            >
              Login Here
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 px-0 md:px-4">
            <div className="flex gap-2">
              <div className="w-1/2 space-y-1">
                <Label htmlFor="firstName" className="sr-only">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  className="rounded-none border-0 border-b border-foreground bg-transparent"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="w-1/2 space-y-1">
                <Label htmlFor="lastName" className="sr-only">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  className="rounded-none border-0 border-b border-foreground bg-transparent"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Enter Email"
                className="rounded-none border-0 border-b border-foreground bg-transparent"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Password"
                className="rounded-none border-0 border-b border-foreground bg-transparent"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="rounded-none border-0 border-b border-foreground bg-transparent"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-xs text-destructive">{errors.passwordConfirm.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isRegistering} className="my-4 px-10">
              {isRegistering ? <Spinner className="h-4 w-4" /> : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
