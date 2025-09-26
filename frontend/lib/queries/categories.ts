import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Categoria {
    id: string;
    nome: string;
    descricao: string;
    codigo: string;
    ativo: boolean;
    created_at: string;
    updated_at: string;
}

export const useGetCategorias = () => {
    return useQuery<Categoria[], Error>({
        queryKey: ['categorias'],
        queryFn: () => api.get('/categorias'),
    });
};