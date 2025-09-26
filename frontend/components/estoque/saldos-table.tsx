"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ArrowUpDown, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const saldos = [
  {
    id: 1,
    produto: "Arroz Tio João 5kg",
    ean: "7891000100103",
    local: "Depósito",
    lote: "L240115",
    saldo: 45,
    validade: "2024-08-15",
    status: "normal",
  },
  {
    id: 2,
    produto: "Feijão Carioca Camil 1kg",
    ean: "7891000100110",
    local: "Gôndola",
    lote: "L240120",
    saldo: 8,
    validade: "2024-09-20",
    status: "baixo",
  },
  {
    id: 3,
    produto: "Açúcar Cristal União 1kg",
    ean: "7891000100127",
    local: "Depósito",
    lote: "L240110",
    saldo: 0,
    validade: "2025-01-10",
    status: "zerado",
  },
  {
    id: 4,
    produto: "Óleo de Soja Liza 900ml",
    ean: "7891000100134",
    local: "Gôndola",
    lote: "L240105",
    saldo: 23,
    validade: "2024-03-05",
    status: "vencendo",
  },
  {
    id: 5,
    produto: "Macarrão Espaguete Barilla 500g",
    ean: "7891000100141",
    local: "Depósito",
    lote: "L240125",
    saldo: 67,
    validade: "2024-12-25",
    status: "normal",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "normal":
      return <Badge variant="default">Normal</Badge>
    case "baixo":
      return <Badge variant="secondary">Baixo</Badge>
    case "zerado":
      return <Badge variant="destructive">Zerado</Badge>
    case "vencendo":
      return <Badge variant="destructive">Vencendo</Badge>
    default:
      return <Badge variant="secondary">-</Badge>
  }
}

function isValidadeCritica(validade: string) {
  const hoje = new Date()
  const dataValidade = new Date(validade)
  const diffTime = dataValidade.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

export function SaldosTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Produto
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Lote</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Saldo
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Validade
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {saldos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{item.produto}</div>
                  <div className="text-sm text-muted-foreground font-mono">{item.ean}</div>
                </div>
              </TableCell>
              <TableCell>{item.local}</TableCell>
              <TableCell className="font-mono text-sm">{item.lote}</TableCell>
              <TableCell className="text-right font-medium">{item.saldo}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {isValidadeCritica(item.validade) && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  <span className={isValidadeCritica(item.validade) ? "text-red-600 font-medium" : ""}>
                    {new Date(item.validade).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Transferir</DropdownMenuItem>
                    <DropdownMenuItem>Ajustar Saldo</DropdownMenuItem>
                    <DropdownMenuItem>Histórico</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
