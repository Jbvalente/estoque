import { Header } from "@/components/layout/header"
import { AbcChart } from "@/components/vendas/abc-chart"
import { AbcTable } from "@/components/vendas/abc-table"
import { AbcFilters } from "@/components/vendas/abc-filters"

export default function AbcPage() {
  return (
    <div className="flex flex-col">
      <Header title="Curva ABC" subtitle="Análise de produtos por faturamento e margem" />

      <div className="flex-1 p-6 space-y-6">
        <AbcFilters />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AbcChart />
          <AbcTable />
        </div>
      </div>
    </div>
  )
}
