import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface ProdutoCompleto {
    id: string;
    ean: string;
    nome: string;
    descricao: string;
    marca: string;
    categoria_id: string;
    categoria_nome: string;
    ncm: string;
    unidade: string;
    peso_kg: number;
    volume_ml: number;
    embalagem: string;
    multiplo_venda: number;
    perecivel: boolean;
    controla_lote: boolean;
    ativo: boolean;
    preco_venda: number;
    margem: number;
    created_at: string;
    updated_at: string;
}

export const useGetProdutos = () => {
    return useQuery<ProdutoCompleto[], Error>({
        queryKey: ['produtos'],
        queryFn: () => api.get('/produtos'),
    });
};