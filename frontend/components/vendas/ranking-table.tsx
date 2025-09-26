"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import Link from "next/link"

const ranking = [
  {
    posicao: 1,
    produto: "Arroz Tio João 5kg",
    categoria: "Alimentícios",
    quantidade: 1250,
    faturamento: 31125.0,
    margem: 8937.5,
    margemPercent: 28.7,
    tendencia: "up",
    variacao: 12.5,
  },
  {
    posicao: 2,
    produto: "Feijão Carioca Camil 1kg",
    categoria: "Alimentícios",
    quantidade: 980,
    faturamento: 8330.0,
    margem: 2674.56,
    margemPercent: 32.1,
    tendencia: "up",
    variacao: 8.3,
  },
  {
    posicao: 3,
    produto: "Açúcar Cristal União 1kg",
    categoria: "Alimentícios",
    quantidade: 850,
    faturamento: 3570.0,
    margem: 892.5,
    margemPercent: 25.0,
    tendencia: "down",
    variacao: -5.2,
  },
  {
    posicao: 4,
    produto: "Óleo de Soja Liza 900ml",
    categoria: "Alimentícios",
    quantidade: 720,
    faturamento: 4896.0,
    margem: 1478.59,
    margemPercent: 30.2,
    tendencia: "stable",
    variacao: 0.8,
  },
  {
    posicao: 5,
    produto: "Macarrão Espaguete Barilla 500g",
    categoria: "Alimentícios",
    quantidade: 650,
    faturamento: 3835.0,
    margem: 1365.26,
    margemPercent: 35.6,
    tendencia: "up",
    variacao: 15.7,
  },
  {
    posicao: 6,
    produto: "Leite Integral Parmalat 1L",
    categoria: "Laticínios",
    quantidade: 580,
    faturamento: 2784.0,
    margem: 835.2,
    margemPercent: 30.0,
    tendencia: "down",
    variacao: -3.1,
  },
  {
    posicao: 7,
    produto: "Café Pilão 500g",
    categoria: "Alimentícios",
    quantidade: 520,
    faturamento: 7280.0,
    margem: 2184.0,
    margemPercent: 30.0,
    tendencia: "up",
    variacao: 22.4,
  },
  {
    posicao: 8,
    produto: "Refrigerante Coca-Cola 2L",
    categoria: "Bebidas",
    quantidade: 480,
    faturamento: 3360.0,
    margem: 1008.0,
    margemPercent: 30.0,
    tendencia: "stable",
    variacao: 1.2,
  },
]

function getTendenciaIcon(tendencia: string) {
  switch (tendencia) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-600" />
    case "stable":
      return <Minus className="h-4 w-4 text-gray-600" />
    default:
      return null
  }
}

export function RankingTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Faturamento</TableHead>
            <TableHead className="text-right">Margem R$</TableHead>
            <TableHead className="text-right">Margem %</TableHead>
            <TableHead className="text-center">Tendência</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ranking.map((item) => (
            <TableRow key={item.posicao} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center justify-center">
                  {item.posicao <= 3 ? (
                    <Badge variant={item.posicao === 1 ? "default" : item.posicao === 2 ? "secondary" : "outline"}>
                      {item.posicao}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">{item.posicao}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/produtos/${item.posicao}`} className="hover:underline">
                  <div className="font-medium">{item.produto}</div>
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{item.categoria}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">{item.quantidade.toLocaleString("pt-BR")}</TableCell>
              <TableCell className="text-right font-medium">
                R$ {item.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right font-medium text-green-600">
                R$ {item.margem.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right">{item.margemPercent.toFixed(1)}%</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {getTendenciaIcon(item.tendencia)}
                  <span
                    className={`text-sm font-medium ${
                      item.tendencia === "up"
                        ? "text-green-600"
                        : item.tendencia === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {item.variacao > 0 ? "+" : ""}
                    {item.variacao.toFixed(1)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
