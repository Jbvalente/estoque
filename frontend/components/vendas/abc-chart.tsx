"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Classe A", value: 80, count: 20, color: "#22c55e" },
  { name: "Classe B", value: 15, count: 30, color: "#eab308" },
  { name: "Classe C", value: 5, count: 50, color: "#ef4444" },
]

export function AbcChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição ABC</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Participação"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <div className="text-muted-foreground">
                {item.count}% dos produtos • {item.value}% do faturamento
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
