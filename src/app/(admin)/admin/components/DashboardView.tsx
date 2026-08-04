"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { useAdminDashboard } from "@/hooks/admin/useAdminResources";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  sales: { label: "Sales", color: "var(--primary)" },
} satisfies ChartConfig;

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card className="rounded-none">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="font-heading text-2xl">{value}</CardTitle>
      </CardHeader>
      {hint ? (
        <CardContent>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}

export function DashboardView() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Dashboard"
          description="Overview of store performance"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-none" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of store performance (dummy data)"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total sales"
          value={`$${data.totalSales.toLocaleString()}`}
        />
        <StatCard label="Orders today" value={data.ordersToday} />
        <StatCard label="Orders this week" value={data.ordersWeek} />
        <StatCard label="Pending orders" value={data.pendingOrders} />
        <StatCard label="Products in stock" value={data.productsInStock} />
        <StatCard label="Low stock" value={data.lowStock} hint="≤ 5 units" />
        <StatCard
          label="Wholesale inquiries"
          value={data.wholesaleInquiries}
        />
        <StatCard
          label="Customize requests"
          value={data.customizeRequests}
        />
        <StatCard
          label="Affiliate applications"
          value={data.affiliateApplications}
        />
        <StatCard label="Customers" value={data.newCustomers} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Weekly sales</CardTitle>
            <CardDescription>Revenue by day (dummy)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={data.salesByDay} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={0} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Top products</CardTitle>
            <CardDescription>Best sellers this period</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {data.topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sold} sold
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ${product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Recent orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-xs">
                    {order._id.slice(-8)}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    {order.currency} {order.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
