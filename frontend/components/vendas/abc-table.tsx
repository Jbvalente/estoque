import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const abcData = [
  {
    classe: "A",
    produtos: 156,
    participacaoProdutos: 20,
    faturamento: 2450000,
    participacaoFaturamento: 80,
    margemMedia: 32.5,
  },
  {
    classe: "B",
    produtos: 234,
    participacaoProdutos: 30,
    faturamento: 459375,
    participacaoFaturamento: 15,
    margemMedia: 28.8,
  },
  {
    classe: "C",
    produtos: 390,
    participacaoProdutos: 50,
    faturamento: 153125,
    participacaoFaturamento: 5,
    margemMedia: 25.2,
  },
]

function getClasseBadge(classe: string) {
  switch (classe) {
    case "A":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Classe A</Badge>
    case "B":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Classe B</Badge>
      )
    case "C":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Classe C</Badge>
    default:
      return <Badge variant="secondary">-</Badge>
  }
}

export function AbcTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo por Classe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {abcData.map((item) => (
            <div key={item.classe} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                {getClasseBadge(item.classe)}
                <div className="text-right">
                  <div className="text-2xl font-bold">R$ {(item.faturamento / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-muted-foreground">{item.participacaoFaturamento}% do faturamento</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Produtos</div>
                  <div className="font-medium">
                    {item.produtos} ({item.participacaoProdutos}%)
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Margem Média</div>
                  <div className="font-medium">{item.margemMedia}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
