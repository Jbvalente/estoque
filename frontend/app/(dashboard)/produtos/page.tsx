import { Header } from "@/components/layout/header"
import { ProductsTable } from "@/components/produtos/products-table"
import { ProductsFilters } from "@/components/produtos/products-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ProdutosPage() {
  return (
    <div className="flex flex-col">
      <Header title="Produtos" subtitle="Gerencie o catálogo de produtos da sua loja" />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <ProductsFilters />
          <Button asChild>
            <Link href="/produtos/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Link>
          </Button>
        </div>

        <ProductsTable />
      </div>
    </div>
  )
}
