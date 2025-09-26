"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, Calendar } from "lucide-react"

export function MovimentacoesFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-10 w-80" />
      </div>

      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="entrada">Entrada</SelectItem>
          <SelectItem value="saida">Saída</SelectItem>
          <SelectItem value="ajuste">Ajuste</SelectItem>
          <SelectItem value="transferencia">Transferência</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Calendar className="mr-2 h-4 w-4" />
        Período
      </Button>

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
