import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Calendar, TrendingDown, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Vencendo em 7 dias",
    value: "12",
    description: "Produtos críticos",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Vencendo em 15 dias",
    value: "28",
    description: "Atenção necessária",
    icon: Calendar,
    color: "text-yellow-600",
  },
  {
    title: "Vencendo em 30 dias",
    value: "45",
    description: "Monitoramento",
    icon: TrendingDown,
    color: "text-blue-600",
  },
  {
    title: "Valor em Risco",
    value: "R$ 12.450",
    description: "Total dos produtos",
    icon: DollarSign,
    color: "text-purple-600",
  },
]

export function ValidadeStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
