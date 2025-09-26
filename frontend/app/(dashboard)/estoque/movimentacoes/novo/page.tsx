import { Header } from "@/components/layout/header"

export default function NovaMovimentacaoPage() {
  return (
    <div className="flex flex-col">
      <Header title="Nova Movimentação" subtitle="Registre entrada, saída ou transferência de produtos" />

      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Funcionalidade de movimentações será implementada na próxima versão.
          </p>
        </div>
      </div>
    </div>
  )
}
