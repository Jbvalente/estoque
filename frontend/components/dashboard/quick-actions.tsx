import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardList, Package, TrendingUp } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Nova Entrada",
    description: "Registrar entrada de mercadoria",
    icon: Plus,
    href: "/estoque/movimentacoes/nova",
    variant: "default" as const,
  },
  {
    title: "Iniciar Inventário",
    description: "Começar novo inventário",
    icon: ClipboardList,
    href: "/inventario/novo",
    variant: "outline" as const,
  },
  {
    title: "Gerenciar Produtos",
    description: "Cadastrar e editar produtos",
    icon: Package,
    href: "/produtos",
    variant: "outline" as const,
  },
  {
    title: "Relatório de Vendas",
    description: "Ver performance de vendas",
    icon: TrendingUp,
    href: "/vendas/ranking",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Button key={action.title} variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
              <Link href={action.href}>
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
