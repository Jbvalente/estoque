"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Download, Tag } from "lucide-react"

export function ValidadeFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar produto..." className="pl-10 w-80" />
        </div>

        <Select defaultValue="30">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Prazo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Próximos 7 dias</SelectItem>
            <SelectItem value="15">Próximos 15 dias</SelectItem>
            <SelectItem value="30">Próximos 30 dias</SelectItem>
            <SelectItem value="60">Próximos 60 dias</SelectItem>
          </SelectContent>
        </Select>

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
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="alimenticios">Alimentícios</SelectItem>
            <SelectItem value="bebidas">Bebidas</SelectItem>
            <SelectItem value="limpeza">Limpeza</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Tag className="mr-2 h-4 w-4" />
          Etiquetas Promo
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  )
}
