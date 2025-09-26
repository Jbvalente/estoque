import { Header } from "@/components/layout/header"
import { SaldosTable } from "@/components/estoque/saldos-table"
import { SaldosFilters } from "@/components/estoque/saldos-filters"

export default function SaldosPage() {
  return (
    <div className="flex flex-col">
      <Header title="Saldos de Estoque" subtitle="Visualize os saldos atuais por produto e local" />

      <div className="flex-1 p-6 space-y-6">
        <SaldosFilters />
        <SaldosTable />
      </div>
    </div>
  )
}
