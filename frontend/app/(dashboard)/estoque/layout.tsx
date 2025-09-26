"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function EstoqueLayout({
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
            href="/estoque/saldos"
            className={cn(
              "border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border",
              pathname === "/estoque/saldos" && "border-primary text-foreground",
            )}
          >
            Saldos
          </Link>
          <Link
            href="/estoque/movimentacoes"
            className={cn(
              "border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border",
              pathname === "/estoque/movimentacoes" && "border-primary text-foreground",
            )}
          >
            Movimentações
          </Link>
        </nav>
      </div>
      {children}
    </div>
  )
}
