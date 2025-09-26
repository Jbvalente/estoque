"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Calendar,
  TrendingUp,
  ClipboardList,
  Settings,
  Search,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Produtos",
    href: "/produtos",
    icon: Package,
  },
  {
    name: "Estoque",
    href: "/estoque",
    icon: Warehouse,
    children: [
      { name: "Saldos", href: "/estoque/saldos" },
      { name: "Movimentações", href: "/estoque/movimentacoes" },
    ],
  },
  {
    name: "Validade",
    href: "/validade",
    icon: Calendar,
  },
  {
    name: "Vendas",
    href: "/vendas",
    icon: TrendingUp,
    children: [
      { name: "Ranking", href: "/vendas/ranking" },
      { name: "Curva ABC", href: "/vendas/abc" },
      { name: "Margens", href: "/vendas/margens" },
    ],
  },
  {
    name: "Inventário",
    href: "/inventario",
    icon: ClipboardList,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Warehouse className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">EstoqueMax</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <div key={item.name}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-10",
                        isActive && "bg-secondary text-secondary-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>

                  {item.children && isActive && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant={pathname === child.href ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                          >
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Usuário Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
