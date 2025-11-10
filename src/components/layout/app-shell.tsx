
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineChart, PenSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent className="mt-14 bg-transparent border-none">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/"}
                tooltip="Check-in"
              >
                <Link href="/">
                  <PenSquare />
                  <span>Check-in</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard"}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LineChart />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="size-6 text-primary" />
            <span className="font-headline text-xl font-medium">Mindful Charts</span>
          </Link>
          <SidebarTrigger className="md:hidden"/>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
