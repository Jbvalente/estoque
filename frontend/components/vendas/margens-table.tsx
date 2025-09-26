"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const margens = [
  {
    id: 1,
    produto: "Arroz Tio João 5kg",
    categoria: "Alimentícios",
    precoVenda: 24.9,
    custoUltimo: 17.8,
    custoMedio: 18.2,
    margemUltimo: 28.5,
    margemMedio: 26.9,
    margemReais: 7.1,
    tendencia: "up",
  },
  {
    id: 2,
    produto: "Feijão Carioca Camil 1kg",
    categoria: "Alimentícios",
    precoVenda: 8.5,
    custoUltimo: 5.77,
    custoMedio: 5.95,
    margemUltimo: 32.1,
    margemMedio: 30.0,
    margemReais: 2.73,
    tendencia: "up",
  },
  {
    id: 3,
    produto: "Açúcar Cristal União 1kg",
    categoria: "Alimentícios",
    precoVenda: 4.2,
    custoUltimo: 3.15,
    custoMedio: 3.08,
    margemUltimo: 25.0,
    margemMedio: 26.7,
    margemReais: 1.05,
    tendencia: "down",
  },
  {
    id: 4,
    produto: "Óleo de Soja Liza 900ml",
    categoria: "Alimentícios",
    precoVenda: 6.8,
    custoUltimo: 4.74,
    custoMedio: 4.68,
    margemUltimo: 30.3,
    margemMedio: 31.2,
    margemReais: 2.06,
    tendencia: "down",
  },
  {
    id: 5,
    produto: "Macarrão Espaguete Barilla 500g",
    categoria: "Alimentícios",
    precoVenda: 5.9,
    custoUltimo: 3.8,
    custoMedio: 3.75,
    margemUltimo: 35.6,
    margemMedio: 36.4,
    margemReais: 2.1,
    tendencia: "up",
  },
]

function getMargemBadge(margem: number) {
  if (margem >= 35) {
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Alta</Badge>
  } else if (margem >= 25) {
    return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Média</Badge>
  } else {
    return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Baixa</Badge>
  }
}

export function MargensTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Preço Venda
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Custo Último</TableHead>
            <TableHead className="text-right">Custo Médio</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Margem %
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Margem R$</TableHead>
            <TableHead>Classificação</TableHead>
            <TableHead className="text-center">Tendência</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {margens.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="font-medium">{item.produto}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{item.categoria}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">R$ {item.precoVenda.toFixed(2)}</TableCell>
              <TableCell className="text-right">R$ {item.custoUltimo.toFixed(2)}</TableCell>
              <TableCell className="text-right">R$ {item.custoMedio.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div>
                  <div className="font-medium">{item.margemUltimo.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Médio: {item.margemMedio.toFixed(1)}%</div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium text-green-600">R$ {item.margemReais.toFixed(2)}</TableCell>
              <TableCell>{getMargemBadge(item.margemUltimo)}</TableCell>
              <TableCell className="text-center">
                {item.tendencia === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mx-auto" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
