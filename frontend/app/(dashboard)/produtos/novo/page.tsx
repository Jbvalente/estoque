import { Header } from "@/components/layout/header"
import { ProductForm } from "@/components/produtos/product-form"

export default function NovoProdutoPage() {
  return (
    <div className="flex flex-col">
      <Header title="Novo Produto" subtitle="Cadastre um novo produto no sistema" />

      <div className="flex-1 p-6">
        <ProductForm />
      </div>
    </div>
  )
}
