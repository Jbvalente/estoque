"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useGetProdutos } from "@/lib/queries/products"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductsTable() {
  const { data: produtos, isLoading, isError } = useGetProdutos();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"><Skeleton className="h-4 w-4" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead><Skeleton className="h-4 w-40" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-16" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-12" /></TableHead>
              <TableHead><Skeleton className="h-4 w-16" /></TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-md">
        <p className="text-destructive">Erro ao carregar os produtos.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts(produtos?.map((p) => p.id) || [])
                  } else {
                    setSelectedProducts([])
                  }
                }}
              />
            </TableHead>
            <TableHead>EAN</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Margem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos?.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedProducts.includes(produto.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts([...selectedProducts, produto.id])
                    } else {
                      setSelectedProducts(selectedProducts.filter((id) => id !== produto.id))
                    }
                  }}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{produto.ean}</TableCell>
              <TableCell className="font-medium">{produto.nome}</TableCell>
              <TableCell>{produto.categoria_nome}</TableCell>
              <TableCell className="text-right">R$ {produto.preco_venda?.toFixed(2) || 'N/A'}</TableCell>
              <TableCell className="text-right">{produto.margem?.toFixed(1) || 'N/A'}%</TableCell>
              <TableCell>
                <Badge variant={produto.ativo ? "default" : "secondary"}>
                  {produto.ativo ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/produtos/${produto.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/produtos/${produto.id}/editar`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Desativar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProducts.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t bg-muted/50">
          <span className="text-sm text-muted-foreground">{selectedProducts.length} produto(s) selecionado(s)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Exportar Selecionados
            </Button>
            <Button variant="outline" size="sm">
              Ações em Massa
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
