"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ShoppingCart, PackageOpen, Laptop } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
    return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-[#1D1D1F]">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0071E3]">
            <CardHeader>
              <ShoppingBag className="text-[#0071E3]" />
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0071E3]">
            <CardHeader>
              <ShoppingCart className="text-[#0071E3]" />
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

        </div>

        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0071E3]">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8 text-center">
            <PackageOpen className="mb-3 size-10 text-muted-foreground" />
            <p className="font-medium">No orders yet</p>
            <p className="text-sm text-muted-foreground">
              Your recent purchases will appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0071E3]">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="font-semibold">Looking for a laptop?</h2>
              <p className="text-sm text-muted-foreground">
                Explore our available laptops.
              </p>
              <Link
                href="/"
                className="mt-3 inline-block text-sm font-medium text-[#0071E3] hover:underline"
              >
                Browse Laptops →
              </Link>
            </div>
            <Laptop className="size-10 text-[#0071E3]" />
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
    );
}