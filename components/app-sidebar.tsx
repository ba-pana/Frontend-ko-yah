"use client"

import { useRouter } from "next/navigation"
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth"
import { CONFIG } from "@/lib/config"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Laptop,
  ShoppingCart,
  Package,
  UserRound,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Browse Laptops",
    url: "/laptops",
    icon: Laptop,
  },
  {
    title: "My Cart",
    url: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "My Orders",
    url: "/orders",
    icon: Package,
  },
  {
    title: "My Account",
    url: "/profile",
    icon: UserRound,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
    const router = useRouter();
    const { isChecking } = useAuthGuard({ requireAuth: true });

    if (isChecking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">Verifying session...</p>
            </div>
        );
    }

    const handleLogout = () => {
        clearTokens();
        router.push(CONFIG.ROUTES.LOGIN);
    };

  return (
    <Sidebar collapsible="icon">
    <SidebarHeader className="p-3">
        <div className="flex items-center gap-2 px-1">
            <Laptop className="size-6 shrink-0 text-[#0071E3] justify-center" />

            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="flex text-xl font-bold tracking-tight text-slate-900 text-[#1D1D1F]">
                LAP<span className="text-[#0071E3]">TRIP</span>
            </h2>
            <p className="text-xs text-muted-foreground">
                Laptop Store
            </p>
            </div>
        </div>
    </SidebarHeader>


      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            CUSTOMER MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" onClick={handleLogout} className="group-data-[collapsible=icon]:justify-center">
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
