"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ArrowUp, ArrowDown, RefreshCw, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const movimentacoes = [
  {
    id: 1,
    data: "2024-01-15T10:30:00",
    tipo: "entrada",
    produto: "Arroz Tio João 5kg",
    lote: "L240115",
    quantidade: 50,
    custo: 18.5,
    origem: "Fornecedor ABC",
    destino: "Depósito",
    usuario: "João Silva",
  },
  {
    id: 2,
    data: "2024-01-15T14:20:00",
    tipo: "saida",
    produto: "Feijão Carioca Camil 1kg",
    lote: "L240120",
    quantidade: -12,
    preco: 8.5,
    origem: "Depósito",
    destino: "Venda",
    usuario: "Maria Santos",
  },
  {
    id: 3,
    data: "2024-01-15T16:45:00",
    tipo: "transferencia",
    produto: "Açúcar Cristal União 1kg",
    lote: "L240110",
    quantidade: 20,
    origem: "Depósito",
    destino: "Gôndola",
    usuario: "Pedro Costa",
  },
  {
    id: 4,
    data: "2024-01-16T09:15:00",
    tipo: "ajuste",
    produto: "Óleo de Soja Liza 900ml",
    lote: "L240105",
    quantidade: -3,
    origem: "Inventário",
    destino: "Quebra",
    usuario: "Ana Lima",
  },
]

function getTipoIcon(tipo: string) {
  switch (tipo) {
    case "entrada":
      return <ArrowUp className="h-4 w-4 text-green-600" />
    case "saida":
      return <ArrowDown className="h-4 w-4 text-red-600" />
    case "transferencia":
      return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
    case "ajuste":
      return <RefreshCw className="h-4 w-4 text-yellow-600" />
    default:
      return null
  }
}

function getTipoBadge(tipo: string) {
  switch (tipo) {
    case "entrada":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Entrada
        </Badge>
      )
    case "saida":
      return <Badge variant="destructive">Saída</Badge>
    case "transferencia":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          Transferência
        </Badge>
      )
    case "ajuste":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          Ajuste
        </Badge>
      )
    default:
      return <Badge variant="secondary">-</Badge>
  }
}

export function MovimentacoesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Data/Hora
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Lote</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Origem → Destino</TableHead>
            <TableHead>Usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimentacoes.map((mov) => (
            <TableRow key={mov.id}>
              <TableCell>
                <div className="text-sm">
                  <div>{new Date(mov.data).toLocaleDateString("pt-BR")}</div>
                  <div className="text-muted-foreground">
                    {new Date(mov.data).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getTipoIcon(mov.tipo)}
                  {getTipoBadge(mov.tipo)}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{mov.produto}</div>
              </TableCell>
              <TableCell className="font-mono text-sm">{mov.lote}</TableCell>
              <TableCell className="text-right">
                <span className={`font-medium ${mov.quantidade > 0 ? "text-green-600" : "text-red-600"}`}>
                  {mov.quantidade > 0 ? "+" : ""}
                  {mov.quantidade}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {mov.custo && `R$ ${mov.custo.toFixed(2)}`}
                {mov.preco && `R$ ${mov.preco.toFixed(2)}`}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <span className="text-muted-foreground">{mov.origem}</span>
                  <span className="mx-2">→</span>
                  <span>{mov.destino}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{mov.usuario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
