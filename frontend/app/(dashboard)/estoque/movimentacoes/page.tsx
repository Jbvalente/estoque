import { Header } from "@/components/layout/header"
import { MovimentacoesTable } from "@/components/estoque/movimentacoes-table"
import { MovimentacoesFilters } from "@/components/estoque/movimentacoes-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MovimentacoesPage() {
  return (
    <div className="flex flex-col">
      <Header title="Movimentações de Estoque" subtitle="Histórico de entradas, saídas e transferências" />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <MovimentacoesFilters />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Movimentação
          </Button>
        </div>

        <MovimentacoesTable />
      </div>
    </div>
  )
}
