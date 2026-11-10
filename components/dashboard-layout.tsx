
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
          <span className="ml-3 font-semibold">Dashboard</span>
        </header>

        <main className="flex-1 bg-[#F5F5F7] p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
