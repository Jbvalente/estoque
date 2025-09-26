"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const giroData = [
  { month: "Jan", giro: 3.8 },
  { month: "Fev", giro: 4.1 },
  { month: "Mar", giro: 3.9 },
  { month: "Abr", giro: 4.3 },
  { month: "Mai", giro: 4.2 },
  { month: "Jun", giro: 4.5 },
]

const topSellersData = [
  { produto: "Arroz 5kg", vendas: 1250 },
  { produto: "Feijão 1kg", vendas: 980 },
  { produto: "Açúcar 1kg", vendas: 850 },
  { produto: "Óleo Soja", vendas: 720 },
  { produto: "Macarrão", vendas: 650 },
]

const quebrasData = [
  { motivo: "Vencimento", valor: 45, color: "#ef4444" },
  { motivo: "Avaria", valor: 30, color: "#f97316" },
  { motivo: "Furto", valor: 15, color: "#eab308" },
  { motivo: "Outros", valor: 10, color: "#6b7280" },
]

export function ChartsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Giro de Estoque - Últimos 6 Meses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={giroData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="giro"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topSellersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis dataKey="produto" type="category" width={80} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quebras por Motivo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={quebrasData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="valor"
                >
                  {quebrasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {quebrasData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.motivo} ({item.valor}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
