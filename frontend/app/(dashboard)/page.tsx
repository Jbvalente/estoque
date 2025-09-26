import { Header } from "@/components/layout/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { AlertsList } from "@/components/dashboard/alerts-list"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <Header title="Dashboard" subtitle="Visão geral do seu estoque e vendas" />

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartsSection />
        </div>
        <div className="space-y-6">
          <AlertsList />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
