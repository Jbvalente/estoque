"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormData } from "@/lib/zod-schemas/product"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useGetCategorias } from "@/lib/queries/categories"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

export function ProductForm() {
  const { data: categorias, isLoading: isLoadingCategorias } = useGetCategorias();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ean: "",
      nome: "",
      descricao: "",
      marca: "",
      categoria_id: "",
      ncm: "",
      unidade: "UN",
      peso_kg: 0,
      volume_ml: 0,
      embalagem: "",
      multiplo_venda: 1,
      perecivel: false,
      controla_lote: false,
      preco_venda: 0,
      custo_ultima_compra: 0,
      margem_minima: 0,
      estoque_minimo: 0,
      estoque_maximo: 0,
      fornecedor_principal: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await api.post("/produtos", data);
      toast({ title: "Produto cadastrado com sucesso!" });
      router.push("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      // Toast for error is already handled in api.ts
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/produtos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Salvar e Continuar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basicos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
            <TabsTrigger value="precos">Preços</TabsTrigger>
            <TabsTrigger value="custos">Custos</TabsTrigger>
            <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
            <TabsTrigger value="estoque">Estoque</TabsTrigger>
          </TabsList>

          <TabsContent value="basicos">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ean"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="ean">EAN/Código de Barras</FormLabel>
                        <FormControl>
                          <Input id="ean" placeholder="7891000100103" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="nome">Nome do Produto *</FormLabel>
                        <FormControl>
                          <Input id="nome" placeholder="Ex: Arroz Tio João 5kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="descricao">Descrição</FormLabel>
                      <FormControl>
                        <Textarea id="descricao" placeholder="Descrição detalhada do produto..." rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="categoria_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="categoria_id">Categoria *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingCategorias ? (
                              <SelectItem value="" disabled>Carregando...</SelectItem>
                            ) : (
                              categorias?.map((categoria) => (
                                <SelectItem key={categoria.id} value={categoria.id}>
                                  {categoria.nome}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="marca">Marca</FormLabel>
                        <FormControl>
                          <Input id="marca" placeholder="Ex: Tio João" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ncm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="ncm">NCM</FormLabel>
                        <FormControl>
                          <Input id="ncm" placeholder="10063021" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="unidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="unidade">Unidade de Medida</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="UN">Unidade</SelectItem>
                            <SelectItem value="KG">Quilograma</SelectItem>
                            <SelectItem value="LT">Litro</SelectItem>
                            <SelectItem value="MT">Metro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="peso_kg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="peso_kg">Peso (kg)</FormLabel>
                        <FormControl>
                          <Input id="peso_kg" type="number" step="0.001" placeholder="5.000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ativo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Produto Ativo</FormLabel>
                          <FormDescription>Define se o produto está ativo para venda e movimentação.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="precos">
            <Card>
              <CardHeader>
                <CardTitle>Preços de Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preco_venda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="preco_venda">Preço de Venda *</FormLabel>
                        <FormControl>
                          <Input id="preco_venda" type="number" step="0.01" placeholder="24.90" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="margem_minima"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="margem_minima">Margem Mínima (%)</FormLabel>
                        <FormControl>
                          <Input id="margem_minima" type="number" step="0.1" placeholder="25.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custos">
            <Card>
              <CardHeader>
                <CardTitle>Custos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="custo_ultima_compra"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="custo_ultima_compra">Custo Última Compra</FormLabel>
                        <FormControl>
                          <Input id="custo_ultima_compra" type="number" step="0.01" placeholder="18.50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="custoMedio">Custo Médio</Label>
                    <Input id="custoMedio" type="number" step="0.01" value={0} disabled />
                    <p className="text-xs text-muted-foreground">Calculado automaticamente pelo sistema</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fornecedores">
            <Card>
              <CardHeader>
                <CardTitle>Fornecedores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fornecedor_principal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fornecedor_principal">Fornecedor Principal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um fornecedor..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fornecedor1">Distribuidora ABC Ltda</SelectItem>
                          <SelectItem value="fornecedor2">Atacadão XYZ S/A</SelectItem>
                          <SelectItem value="fornecedor3">Comercial 123 Eireli</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estoque">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="estoque_minimo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="estoque_minimo">Estoque Mínimo</FormLabel>
                        <FormControl>
                          <Input id="estoque_minimo" type="number" placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estoque_maximo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="estoque_maximo">Estoque Máximo</FormLabel>
                        <FormControl>
                          <Input id="estoque_maximo" type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}