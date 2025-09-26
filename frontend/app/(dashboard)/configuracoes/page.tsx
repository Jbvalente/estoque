import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User, Bell, Shield, Database } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col">
      <Header title="Configurações" subtitle="Gerencie as configurações do sistema" />

      <div className="flex-1 p-6">
        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configurações Gerais
                </CardTitle>
                <CardDescription>Configure as preferências básicas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Nome da Empresa</Label>
                    <Input id="empresa" defaultValue="Supermercado ABC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" defaultValue="Rua das Flores, 123 - Centro" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="moeda">Moeda Padrão</Label>
                    <Select defaultValue="brl">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brl">Real (R$)</SelectItem>
                        <SelectItem value="usd">Dólar (US$)</SelectItem>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuso">Fuso Horário</Label>
                    <Select defaultValue="america-sao_paulo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                        <SelectItem value="america-new_york">América/Nova York</SelectItem>
                        <SelectItem value="europe-london">Europa/Londres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Gerenciamento de Usuários
                </CardTitle>
                <CardDescription>Gerencie usuários e permissões do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">Configure usuários, perfis e permissões de acesso</p>
                  <Button>Adicionar Usuário</Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Funcionalidade em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Configurações de Notificações
                </CardTitle>
                <CardDescription>Configure quando e como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Validade</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações sobre produtos próximos ao vencimento
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Estoque Baixo</Label>
                      <p className="text-sm text-muted-foreground">Alertas quando produtos atingem estoque mínimo</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Relatórios Diários</Label>
                      <p className="text-sm text-muted-foreground">Receber resumo diário das operações</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button>Salvar Preferências</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Configurações de Segurança
                </CardTitle>
                <CardDescription>Gerencie configurações de segurança e acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Tempo de Sessão (minutos)</Label>
                    <Select defaultValue="60">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="480">8 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sistema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>Configurações técnicas e de manutenção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Versão do Sistema</Label>
                    <Input value="1.0.0" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Última Atualização</Label>
                    <Input value="15/01/2024" disabled />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Manutenção</h4>
                  <div className="flex gap-2">
                    <Button variant="outline">Backup do Sistema</Button>
                    <Button variant="outline">Limpar Cache</Button>
                    <Button variant="outline">Verificar Integridade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
