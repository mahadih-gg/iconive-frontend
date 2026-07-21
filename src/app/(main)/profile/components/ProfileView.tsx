"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Shield } from "lucide-react";
import { useForm } from "react-hook-form";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useProfile } from "@/hooks/useProfile";
import { useWishlist } from "@/hooks/useWishlist";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/profileSchema";
import { cn } from "@/utils/cn";

const SIDEBAR = [
  { id: 1, name: "My Profile" },
  { id: 2, name: "Orders" },
  { id: 3, name: "Order History" },
  { id: 4, name: "Wishlist" },
  { id: 5, name: "Refund and Return" },
] as const;

export function ProfileView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { profile, updateProfile, isUpdating } = useProfile();
  const { orders, history, cancelled, isLoading: ordersLoading } = useOrders();
  const { products: wishlist, isLoading: wishlistLoading } = useWishlist();
  const [sidebar, setSidebar] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  useEffect(() => {
    const q = searchParams.get("sidebar");
    if (q) setSidebar(Number(q));
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace("/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const data = profile ?? user;
    if (data) {
      reset({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
      });
    }
  }, [profile, user, reset]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const displayName = profile?.name ?? user?.name ?? "";

  return (
    <div className="bg-background px-4 py-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 py-8 lg:flex-row">
        <aside className="mx-auto w-full max-w-xs lg:w-1/5">
          <div className="border bg-muted pt-8">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
              <h1 className="text-3xl font-bold text-primary-foreground">
                {displayName?.[0]?.toUpperCase() ?? "U"}
              </h1>
            </div>
            <h4 className="pb-4 text-center font-bold">{displayName}</h4>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-center gap-2 border-y py-4">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Account</span>
              </div>
              {SIDEBAR.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSidebar(item.id);
                    router.replace(`/profile?sidebar=${item.id}`);
                  }}
                  className={cn(
                    "w-full border-b py-3 text-start text-sm",
                    sidebar === item.id ? "font-bold text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant="ghost"
                className="mt-4 w-full justify-start gap-2"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {sidebar === 1 && (
            <form
              onSubmit={handleSubmit((values) => updateProfile(values))}
              className="max-w-lg space-y-4 text-start"
            >
              <h2 className="mb-4 text-xl font-bold">My Profile</h2>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" disabled {...register("email")} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <Spinner className="h-4 w-4" /> : "Save Changes"}
              </Button>
            </form>
          )}

          {sidebar === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Orders</h2>
              {ordersLoading ? (
                <Skeleton className="h-40 w-full" />
              ) : orders.length === 0 ? (
                <p className="text-muted-foreground">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order._id} className="rounded border p-4 text-start">
                      <p className="font-semibold">Order #{order._id?.slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">
                        Status: {String(order.status ?? order.payment_status ?? "—")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {sidebar === 3 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Order History</h2>
              {history.length === 0 ? (
                <p className="text-muted-foreground">No order history</p>
              ) : (
                <div className="space-y-3">
                  {history.map((order) => (
                    <div key={order._id} className="rounded border p-4 text-start">
                      <p className="font-semibold">Order #{order._id?.slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.createdAt
                          ? new Date(String(order.createdAt)).toLocaleDateString("en-US")
                          : "—"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {sidebar === 4 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Wishlist</h2>
              {wishlistLoading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div className="flex flex-wrap gap-4">
                  {wishlist.map((p) => (
                    <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
                  ))}
                  {wishlist.length === 0 && (
                    <p className="text-muted-foreground">Wishlist is empty</p>
                  )}
                </div>
              )}
            </div>
          )}

          {sidebar === 5 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Refund and Return</h2>
              {cancelled.length === 0 ? (
                <p className="text-muted-foreground">No refund requests</p>
              ) : (
                <div className="space-y-3">
                  {cancelled.map((order) => (
                    <div key={order._id} className="rounded border p-4 text-start">
                      <p className="font-semibold">Order #{order._id?.slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">Cancelled / Refund</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
