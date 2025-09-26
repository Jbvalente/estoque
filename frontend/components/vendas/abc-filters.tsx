"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

export function AbcFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Últimos 30 dias
        </Button>

        <Select defaultValue="faturamento">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Critério" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="faturamento">Faturamento</SelectItem>
            <SelectItem value="margem">Margem</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  )
}
