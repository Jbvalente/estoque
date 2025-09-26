import { Header } from "@/components/layout/header"
import { MargensTable } from "@/components/vendas/margens-table"
import { MargensFilters } from "@/components/vendas/margens-filters"

export default function MargensPage() {
  return (
    <div className="flex flex-col">
      <Header title="Análise de Margens" subtitle="Margens por produto, categoria e fornecedor" />

      <div className="flex-1 p-6 space-y-6">
        <MargensFilters />
        <MargensTable />
      </div>
    </div>
  )
}
