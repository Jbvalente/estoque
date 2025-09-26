import { z } from "zod";

export const productSchema = z.object({
  ean: z.string().optional(),
  nome: z.string().min(1, "O nome do produto é obrigatório."),
  descricao: z.string().optional(),
  marca: z.string().optional(),
  categoria_id: z.string().uuid("Categoria inválida."),
  ncm: z.string().optional(),
  unidade: z.string().default("UN"),
  peso_kg: z.coerce.number().optional(),
  volume_ml: z.coerce.number().optional(),
  embalagem: z.string().optional(),
  multiplo_venda: z.coerce.number().int().default(1),
  perecivel: z.boolean().default(false),
  controla_lote: z.boolean().default(false),
  // Campos de preço e custo
  preco_venda: z.coerce.number().min(0, "O preço de venda não pode ser negativo."),
  custo_ultima_compra: z.coerce.number().optional(),
  margem_minima: z.coerce.number().optional(),
  // Campos de estoque
  estoque_minimo: z.coerce.number().optional(),
  estoque_maximo: z.coerce.number().optional(),
  // Campos de fornecedor
  fornecedor_principal: z.string().uuid().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
