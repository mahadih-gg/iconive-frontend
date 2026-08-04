"use client";

import { Package } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useOrders";

import { OrderCard } from "./OrderCard";
import { ProfileShell } from "./ProfileShell";

export function OrdersView() {
  const { orders, isLoading } = useOrders();

  return (
    <ProfileShell title="Orders">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-none" />
          <Skeleton className="h-40 w-full rounded-none" />
        </div>
      ) : orders.length === 0 ? (
        <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center bg-primary/15 text-primary-dark">
            <Package className="size-7" />
          </div>
          <p className="font-heading mt-5 text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Orders
          </p>
          <h2 className="font-heading mt-2 text-2xl font-semibold">
            No active orders
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            When you place an order, you can track it here from payment through
            delivery.
          </p>
          <Button asChild variant="cta" size="ctaSm" className="mt-6">
            <Link href="/products">Shop Wigs</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard
              key={order._id}
              order={order}
              variant="active"
              defaultExpanded={index === 0}
              showTracking
            />
          ))}
        </div>
      )}
    </ProfileShell>
  );
}
