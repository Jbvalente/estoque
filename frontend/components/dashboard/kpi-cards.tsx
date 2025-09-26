import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, AlertTriangle, DollarSign } from "lucide-react"

const kpis = [
  {
    title: "Giro de Estoque",
    value: "4.2x",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
    description: "Últimos 30 dias",
  },
  {
    title: "Cobertura",
    value: "18 dias",
    change: "-3 dias",
    trend: "down",
    icon: Calendar,
    description: "Média atual",
  },
  {
    title: "Taxa de Ruptura",
    value: "2.1%",
    change: "-0.5%",
    trend: "up",
    icon: AlertTriangle,
    description: "Produtos em falta",
  },
  {
    title: "Perdas",
    value: "R$ 8.450",
    change: "+R$ 1.200",
    trend: "down",
    icon: TrendingDown,
    description: "Quebra + vencimento",
  },
  {
    title: "Margem Média",
    value: "28.5%",
    change: "+1.2%",
    trend: "up",
    icon: DollarSign,
    description: "Margem bruta",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const isPositive = kpi.trend === "up"

        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs">
                <span className={`${isPositive ? "text-green-600" : "text-red-600"} font-medium`}>{kpi.change}</span>
                <span className="text-muted-foreground ml-1">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
