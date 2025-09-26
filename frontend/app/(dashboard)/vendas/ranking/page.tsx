import { Header } from "@/components/layout/header"
import { RankingTable } from "@/components/vendas/ranking-table"
import { RankingFilters } from "@/components/vendas/ranking-filters"

export default function RankingPage() {
  return (
    <div className="flex flex-col">
      <Header title="Ranking de Vendas" subtitle="Top produtos por quantidade, faturamento e margem" />

      <div className="flex-1 p-6 space-y-6">
        <RankingFilters />
        <RankingTable />
      </div>
    </div>
  )
}
