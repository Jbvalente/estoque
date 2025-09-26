import { Header } from "@/components/layout/header"
import { ValidadeTable } from "@/components/validade/validade-table"
import { ValidadeFilters } from "@/components/validade/validade-filters"
import { ValidadeStats } from "@/components/validade/validade-stats"

export default function ValidadePage() {
  return (
    <div className="flex flex-col">
      <Header title="Alertas de Validade" subtitle="Produtos próximos ao vencimento que requerem atenção" />

      <div className="flex-1 p-6 space-y-6">
        <ValidadeStats />
        <ValidadeFilters />
        <ValidadeTable />
      </div>
    </div>
  )
}
