"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download } from "lucide-react"

export function ProductsFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por EAN ou nome..." className="pl-10 w-80" />
      </div>

      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          <SelectItem value="alimenticios">Alimentícios</SelectItem>
          <SelectItem value="bebidas">Bebidas</SelectItem>
          <SelectItem value="limpeza">Limpeza</SelectItem>
          <SelectItem value="higiene">Higiene</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        Filtros
      </Button>

      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  )
}
