"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function VendasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          <Link
            href="/vendas/ranking"
            className={cn(
              "border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border",
              pathname === "/vendas/ranking" && "border-primary text-foreground",
            )}
          >
            Ranking
          </Link>
          <Link
            href="/vendas/abc"
            className={cn(
              "border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border",
              pathname === "/vendas/abc" && "border-primary text-foreground",
            )}
          >
            Curva ABC
          </Link>
          <Link
            href="/vendas/margens"
            className={cn(
              "border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border",
              pathname === "/vendas/margens" && "border-primary text-foreground",
            )}
          >
            Margens
          </Link>
        </nav>
      </div>
      {children}
    </div>
  )
}
