"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Download, Filter } from "lucide-react"

export function MargensFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar produto..." className="pl-10 w-80" />
        </div>

        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Últimos 30 dias
        </Button>

        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="alimenticios">Alimentícios</SelectItem>
            <SelectItem value="bebidas">Bebidas</SelectItem>
            <SelectItem value="limpeza">Limpeza</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Fornecedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="fornecedor1">Distribuidora ABC</SelectItem>
            <SelectItem value="fornecedor2">Atacadão XYZ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  )
}
