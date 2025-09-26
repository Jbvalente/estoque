"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, AlertTriangle, Tag, ArrowRightLeft, Undo } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const produtos = [
  {
    id: 1,
    produto: "Iogurte Natural Danone 170g",
    lote: "L240201",
    validade: "2024-02-05",
    saldo: 24,
    loja: "Loja Centro",
    local: "Câmara Fria",
    valorUnitario: 3.5,
    valorTotal: 84.0,
    diasRestantes: 3,
    sugestao: "promover",
  },
  {
    id: 2,
    produto: "Pão de Forma Wickbold 500g",
    lote: "L240203",
    validade: "2024-02-08",
    saldo: 15,
    loja: "Loja Shopping",
    local: "Gôndola",
    valorUnitario: 4.2,
    valorTotal: 63.0,
    diasRestantes: 6,
    sugestao: "promover",
  },
  {
    id: 3,
    produto: "Leite Integral Parmalat 1L",
    lote: "L240210",
    validade: "2024-02-15",
    saldo: 48,
    loja: "Loja Centro",
    local: "Câmara Fria",
    valorUnitario: 4.8,
    valorTotal: 230.4,
    diasRestantes: 13,
    sugestao: "transferir",
  },
  {
    id: 4,
    produto: "Queijo Mussarela Tirolez 400g",
    lote: "L240205",
    validade: "2024-02-10",
    saldo: 8,
    loja: "Loja Bairro",
    local: "Câmara Fria",
    valorUnitario: 12.9,
    valorTotal: 103.2,
    diasRestantes: 8,
    sugestao: "devolver",
  },
  {
    id: 5,
    produto: "Presunto Sadia 200g",
    lote: "L240207",
    validade: "2024-02-12",
    saldo: 12,
    loja: "Loja Shopping",
    local: "Câmara Fria",
    valorUnitario: 8.5,
    valorTotal: 102.0,
    diasRestantes: 10,
    sugestao: "promover",
  },
]

function getPrioridadeBadge(dias: number) {
  if (dias <= 7) {
    return <Badge variant="destructive">Crítico</Badge>
  } else if (dias <= 15) {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
        Atenção
      </Badge>
    )
  } else {
    return <Badge variant="secondary">Normal</Badge>
  }
}

function getSugestaoIcon(sugestao: string) {
  switch (sugestao) {
    case "promover":
      return <Tag className="h-4 w-4 text-green-600" />
    case "transferir":
      return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
    case "devolver":
      return <Undo className="h-4 w-4 text-orange-600" />
    default:
      return null
  }
}

export function ValidadeTable() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(produtos.map((p) => p.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedItems.length === produtos.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead className="text-right">Saldo</TableHead>
              <TableHead>Loja/Local</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Sugestão</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.produto}</div>
                </TableCell>
                <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item.diasRestantes <= 7 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <div>
                      <div
                        className={`font-medium ${
                          item.diasRestantes <= 7 ? "text-red-600" : item.diasRestantes <= 15 ? "text-yellow-600" : ""
                        }`}
                      >
                        {new Date(item.validade).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-xs text-muted-foreground">{item.diasRestantes} dias</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{item.saldo}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{item.loja}</div>
                    <div className="text-muted-foreground">{item.local}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <div className="font-medium">R$ {item.valorTotal.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">R$ {item.valorUnitario.toFixed(2)} cada</div>
                  </div>
                </TableCell>
                <TableCell>{getPrioridadeBadge(item.diasRestantes)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getSugestaoIcon(item.sugestao)}
                    <span className="text-sm capitalize">{item.sugestao}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        Criar Promoção
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                        Transferir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Undo className="mr-2 h-4 w-4" />
                        Devolver
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedItems.length} item(ns) selecionado(s)</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Tag className="mr-2 h-4 w-4" />
              Gerar Etiquetas Promo
            </Button>
            <Button size="sm" variant="outline">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Transferir Selecionados
            </Button>
            <Button size="sm">Criar Campanha</Button>
          </div>
        </div>
      )}
    </div>
  )
}
