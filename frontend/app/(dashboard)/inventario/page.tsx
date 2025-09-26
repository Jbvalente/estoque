import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, Play, Pause, CheckCircle } from "lucide-react"

export default function InventarioPage() {
  const inventarios = [
    {
      id: 1,
      nome: "Inventário Geral - Janeiro 2024",
      status: "em_andamento",
      progresso: 65,
      dataInicio: "15/01/2024",
      responsavel: "João Silva",
      itensContados: 1250,
      totalItens: 1920,
    },
    {
      id: 2,
      nome: "Inventário Seção Frios",
      status: "concluido",
      progresso: 100,
      dataInicio: "10/01/2024",
      responsavel: "Maria Santos",
      itensContados: 180,
      totalItens: 180,
    },
    {
      id: 3,
      nome: "Inventário Produtos Vencidos",
      status: "pendente",
      progresso: 0,
      dataInicio: "20/01/2024",
      responsavel: "Carlos Oliveira",
      itensContados: 0,
      totalItens: 45,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_andamento":
        return (
          <Badge variant="default" className="bg-blue-500">
            <Play className="w-3 h-3 mr-1" />
            Em Andamento
          </Badge>
        )
      case "concluido":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Concluído
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="secondary">
            <Pause className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <Header title="Inventário" subtitle="Gerencie e acompanhe os inventários do estoque" />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Inventários</h2>
            <p className="text-muted-foreground">Controle completo dos inventários realizados</p>
          </div>
          <Button>
            <ClipboardList className="w-4 h-4 mr-2" />
            Novo Inventário
          </Button>
        </div>

        <div className="grid gap-6">
          {inventarios.map((inventario) => (
            <Card key={inventario.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{inventario.nome}</CardTitle>
                    <CardDescription>
                      Iniciado em {inventario.dataInicio} • Responsável: {inventario.responsavel}
                    </CardDescription>
                  </div>
                  {getStatusBadge(inventario.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>
                      Progresso: {inventario.itensContados} de {inventario.totalItens} itens
                    </span>
                    <span>{inventario.progresso}%</span>
                  </div>
                  <Progress value={inventario.progresso} className="h-2" />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    {inventario.status === "em_andamento" && <Button size="sm">Continuar</Button>}
                    {inventario.status === "pendente" && <Button size="sm">Iniciar</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
