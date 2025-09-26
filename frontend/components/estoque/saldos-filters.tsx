"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

export function SaldosFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar produto..." className="pl-10 w-80" />
        </div>

        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Loja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as lojas</SelectItem>
            <SelectItem value="loja1">Loja Centro</SelectItem>
            <SelectItem value="loja2">Loja Shopping</SelectItem>
            <SelectItem value="loja3">Loja Bairro</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Local" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os locais</SelectItem>
            <SelectItem value="deposito">Depósito</SelectItem>
            <SelectItem value="gondola">Gôndola</SelectItem>
            <SelectItem value="camara">Câmara Fria</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Mais Filtros
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  )
}
