import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, Package } from "lucide-react"
import Link from "next/link"

const alerts = [
  {
    id: 1,
    type: "validade",
    title: "Produtos próximos ao vencimento",
    count: 23,
    priority: "high",
    icon: Calendar,
    href: "/validade?filter=30days",
  },
  {
    id: 2,
    type: "estoque",
    title: "Estoque abaixo do mínimo",
    count: 8,
    priority: "medium",
    icon: Package,
    href: "/estoque/saldos?filter=low",
  },
  {
    id: 3,
    type: "ruptura",
    title: "Produtos em ruptura",
    count: 5,
    priority: "high",
    icon: AlertTriangle,
    href: "/estoque/saldos?filter=zero",
  },
]

export function AlertsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alertas Críticos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon

          return (
            <Link key={alert.id} href={alert.href}>
              <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      alert.priority === "high"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.count} itens requerem atenção</p>
                  </div>
                </div>
                <Badge variant={alert.priority === "high" ? "destructive" : "secondary"}>{alert.count}</Badge>
              </div>
            </Link>
          )
        })}

        <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
          <Link href="/validade">Ver todos os alertas</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
