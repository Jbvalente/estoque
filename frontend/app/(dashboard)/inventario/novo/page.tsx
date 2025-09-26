import { Header } from "@/components/layout/header"

export default function NovoInventarioPage() {
  return (
    <div className="flex flex-col">
      <Header title="Novo Inventário" subtitle="Crie um novo inventário por setor ou categoria" />

      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Funcionalidade de inventário será implementada na próxima versão.
          </p>
        </div>
      </div>
    </div>
  )
}
