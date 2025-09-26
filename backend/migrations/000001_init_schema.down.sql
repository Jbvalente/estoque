-- Drop Triggers
DROP TRIGGER IF EXISTS trigger_atualizar_custo_medio ON movimentacoes;
DROP FUNCTION IF EXISTS atualizar_custo_medio();

DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
DROP TRIGGER IF EXISTS update_categorias_updated_at ON categorias;
DROP TRIGGER IF EXISTS update_fornecedores_updated_at ON fornecedores;
DROP TRIGGER IF EXISTS update_precos_updated_at ON precos;
DROP TRIGGER IF EXISTS update_custos_updated_at ON custos;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop Tables (in reverse order of creation due to dependencies)

DROP TABLE IF EXISTS configuracoes;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS inventario_coletas;
DROP TABLE IF EXISTS inventarios;
DROP TABLE IF EXISTS vendas;
DROP TABLE IF EXISTS movimentacoes;
DROP TABLE IF EXISTS saldos_lote;
DROP TABLE IF EXISTS lotes;
DROP TABLE IF EXISTS custos;
DROP TABLE IF EXISTS precos;
DROP TABLE IF EXISTS produtos_fornecedores;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS locais;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS lojas;

-- Drop Extensions
-- DROP EXTENSION IF EXISTS "btree_gin";
-- DROP EXTENSION IF EXISTS "uuid-ossp";
