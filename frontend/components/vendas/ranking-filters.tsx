"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"

export function RankingFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Últimos 30 dias
        </Button>

        <Select defaultValue="all">
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

        <Select defaultValue="faturamento">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quantidade">Quantidade</SelectItem>
            <SelectItem value="faturamento">Faturamento</SelectItem>
            <SelectItem value="margem">Margem</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="50">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Top" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Top 10</SelectItem>
            <SelectItem value="25">Top 25</SelectItem>
            <SelectItem value="50">Top 50</SelectItem>
            <SelectItem value="100">Top 100</SelectItem>
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
