-- Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabelas de Configuração e Domínio

CREATE TABLE lojas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    endereco TEXT,
    telefone VARCHAR(15),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    codigo VARCHAR(10) UNIQUE, -- código interno
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fornecedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    contato VARCHAR(100),
    telefone VARCHAR(15),
    email VARCHAR(100),
    endereco TEXT,
    lead_time_dias INTEGER DEFAULT 7,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loja_id UUID NOT NULL REFERENCES lojas(id),
    nome VARCHAR(100) NOT NULL, -- "Depósito", "Gôndola A1", "Câmara Fria"
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('deposito', 'gondola', 'camara', 'balcao', 'estoque_seguranca')),
    capacidade_max INTEGER, -- opcional
    temperatura_min DECIMAL(4,1), -- para câmaras
    temperatura_max DECIMAL(4,1),
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(loja_id, nome)
);

-- Tabelas Principais

CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ean VARCHAR(14) UNIQUE, -- EAN-13 + dígito verificador
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    marca VARCHAR(100),
    categoria_id UUID REFERENCES categorias(id),
    ncm VARCHAR(10), -- Nomenclatura Comum do Mercosul
    unidade VARCHAR(10) DEFAULT 'UN' CHECK (unidade IN ('UN', 'KG', 'LT', 'MT', 'M2', 'M3', 'CX', 'PC')),
    peso_kg DECIMAL(8,3), -- peso unitário
    volume_ml DECIMAL(10,2), -- volume unitário
    embalagem VARCHAR(50), -- "Pacote", "Lata", "Garrafa"
    multiplo_venda INTEGER DEFAULT 1, -- venda mínima (ex: 6 unidades)
    perecivel BOOLEAN DEFAULT false,
    controla_lote BOOLEAN DEFAULT false,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos_fornecedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    fornecedor_id UUID NOT NULL REFERENCES fornecedores(id),
    codigo_fornecedor VARCHAR(50), -- código do produto no fornecedor
    principal BOOLEAN DEFAULT false, -- fornecedor principal
    custo_padrao DECIMAL(10,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(produto_id, fornecedor_id)
);

CREATE TABLE precos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    loja_id UUID REFERENCES lojas(id),
    preco_venda DECIMAL(10,4) NOT NULL CHECK (preco_venda >= 0),
    tabela VARCHAR(20) DEFAULT 'padrao', -- 'padrao', 'promocao', 'atacado'
    margem_minima DECIMAL(5,2), -- percentual
    vigencia_inicio DATE DEFAULT CURRENT_DATE,
    vigencia_fim DATE,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(produto_id, loja_id, tabela, vigencia_inicio)
);

CREATE TABLE custos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    custo_ultima_compra DECIMAL(10,4),
    custo_medio_ponderado DECIMAL(10,4),
    custo_padrao DECIMAL(10,4),
    impostos_pct DECIMAL(5,2) DEFAULT 0, -- % de impostos
    frete_unit DECIMAL(8,4) DEFAULT 0, -- frete por unidade
    outros_custos DECIMAL(8,4) DEFAULT 0,
    data_ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(produto_id)
);

-- Controle de Estoque por Lote

CREATE TABLE lotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID NOT NULL REFERENCES produtos(id),
    numero_lote VARCHAR(50) NOT NULL,
    data_fabricacao DATE,
    data_validade DATE,
    fornecedor_id UUID REFERENCES fornecedores(id),
    nota_fiscal VARCHAR(20), -- número da NF de entrada
    custo_unitario DECIMAL(10,4), -- custo deste lote específico
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(produto_id, numero_lote)
);

CREATE TABLE saldos_lote (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    local_id UUID NOT NULL REFERENCES locais(id),
    saldo DECIMAL(12,3) NOT NULL DEFAULT 0 CHECK (saldo >= 0),
    reservado DECIMAL(12,3) DEFAULT 0 CHECK (reservado >= 0), -- para inventários
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lote_id, local_id)
);

-- Movimentações de Estoque

CREATE TABLE movimentacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN (
        'entrada_compra', 'entrada_devolucao', 'entrada_transferencia', 'entrada_producao', 'entrada_ajuste', 'entrada_inventario',
        'saida_venda', 'saida_transferencia', 'saida_quebra', 'saida_vencimento', 'saida_furto', 'saida_consumo', 'saida_doacao', 'saida_ajuste'
    )),
    produto_id UUID NOT NULL REFERENCES produtos(id),
    lote_id UUID REFERENCES lotes(id), -- pode ser NULL para produtos sem controle de lote
    local_origem_id UUID REFERENCES locais(id),
    local_destino_id UUID REFERENCES locais(id),
    quantidade DECIMAL(12,3) NOT NULL CHECK (quantidade != 0),
    custo_unitario DECIMAL(10,4), -- custo no momento da movimentação
    preco_unitario DECIMAL(10,4), -- preço no momento da venda
    motivo TEXT, -- justificativa para ajustes/quebras
    documento VARCHAR(50), -- NF, cupom fiscal, etc
    usuario_id UUID, -- quem fez a movimentação
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Vendas (desnormalização para performance em relatórios)
CREATE TABLE vendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID NOT NULL REFERENCES produtos(id),
    loja_id UUID NOT NULL REFERENCES lojas(id),
    quantidade DECIMAL(12,3) NOT NULL,
    preco_unitario DECIMAL(10,4) NOT NULL,
    desconto DECIMAL(8,4) DEFAULT 0,
    custo_unitario DECIMAL(10,4), -- para cálculo de margem
    cupom_fiscal VARCHAR(50),
    pdv VARCHAR(10), -- identificação do PDV
    vendedor_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventário

CREATE TABLE inventarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loja_id UUID NOT NULL REFERENCES lojas(id),
    nome VARCHAR(100) NOT NULL, -- "Inventário Mensal Jan/2024"
    setor VARCHAR(50), -- "Mercearia", "Bebidas", "Limpeza"
    data_inicio DATE NOT NULL,
    data_fim DATE,
    status VARCHAR(20) DEFAULT 'planejado' CHECK (status IN ('planejado', 'em_andamento', 'concluido', 'cancelado')),
    responsaveis TEXT[], -- array de nomes/IDs dos responsáveis
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventario_coletas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventario_id UUID NOT NULL REFERENCES inventarios(id) ON DELETE CASCADE,
    produto_id UUID NOT NULL REFERENCES produtos(id),
    lote_id UUID REFERENCES lotes(id),
    local_id UUID NOT NULL REFERENCES locais(id),
    quantidade_sistema DECIMAL(12,3) NOT NULL, -- saldo no sistema
    quantidade_contada DECIMAL(12,3) NOT NULL, -- quantidade contada fisicamente
    diferenca DECIMAL(12,3) GENERATED ALWAYS AS (quantidade_contada - quantidade_sistema) STORED,
    usuario_coleta VARCHAR(100), -- quem fez a contagem
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(inventario_id, produto_id, lote_id, local_id)
);

-- Usuários e Perfis

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('admin', 'gerente', 'comprador', 'operador_estoque', 'vendedor')),
    loja_id UUID REFERENCES lojas(id), -- loja padrão do usuário
    ativo BOOLEAN DEFAULT true,
    ultimo_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Configurações do Sistema

CREATE TABLE configuracoes (
    chave VARCHAR(100) PRIMARY KEY,
    valor TEXT NOT NULL,
    descricao TEXT,
    tipo VARCHAR(20) DEFAULT 'string' CHECK (tipo IN ('string', 'number', 'boolean', 'json')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, descricao, tipo) VALUES
('alerta_validade_dias', '30', 'Dias antes do vencimento para alertar', 'number'),
('metodo_custo', 'medio_ponderado', 'Método de custo: ultima_compra ou medio_ponderado', 'string'),
('inventario_bloqueia_movimentacao', 'true', 'Bloquear movimentações durante inventário', 'boolean'),
('backup_automatico', 'true', 'Executar backup automático diário', 'boolean');

-- Índices para Performance

-- Produtos
CREATE INDEX idx_produtos_ean ON produtos(ean) WHERE ean IS NOT NULL;
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id) WHERE ativo = true;
-- CREATE INDEX idx_produtos_nome_gin ON produtos USING gin(nome gin_trgm_ops);

-- Lotes e Validade
CREATE INDEX idx_lotes_produto_validade ON lotes(produto_id, data_validade);
CREATE INDEX idx_lotes_validade_critica ON lotes(data_validade) WHERE data_validade <= CURRENT_DATE + INTERVAL '30 days';

-- Saldos
CREATE INDEX idx_saldos_lote_local ON saldos_lote(lote_id, local_id);
CREATE INDEX idx_saldos_local ON saldos_lote(local_id) WHERE saldo > 0;

-- Movimentações
CREATE INDEX idx_movimentacoes_produto_data ON movimentacoes(produto_id, created_at DESC);
CREATE INDEX idx_movimentacoes_tipo_data ON movimentacoes(tipo, created_at DESC);
CREATE INDEX idx_movimentacoes_lote ON movimentacoes(lote_id) WHERE lote_id IS NOT NULL;

-- Vendas
CREATE INDEX idx_vendas_produto_data ON vendas(produto_id, created_at DESC);
CREATE INDEX idx_vendas_loja_data ON vendas(loja_id, created_at DESC);

-- Inventário
CREATE INDEX idx_inventario_status_loja ON inventarios(status, loja_id);
CREATE INDEX idx_inventario_coletas_diferenca ON inventario_coletas(inventario_id) WHERE ABS(diferenca) > 0.001;

-- Triggers e Stored Procedures

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas necessárias
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fornecedores_updated_at BEFORE UPDATE ON fornecedores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_precos_updated_at BEFORE UPDATE ON precos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custos_updated_at BEFORE UPDATE ON custos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar custo médio ponderado
CREATE OR REPLACE FUNCTION atualizar_custo_medio()
RETURNS TRIGGER AS $$
DECLARE
    saldo_atual DECIMAL(12,3);
    custo_atual DECIMAL(10,4);
    novo_custo DECIMAL(10,4);
BEGIN
    IF TG_OP = 'INSERT' AND NEW.tipo = 'entrada_compra' AND NEW.custo_unitario IS NOT NULL THEN
        -- Buscar saldo atual e custo médio
        SELECT COALESCE(SUM(sl.saldo), 0) INTO saldo_atual
        FROM saldos_lote sl
        JOIN lotes l ON sl.lote_id = l.id
        WHERE l.produto_id = NEW.produto_id;
        
        SELECT custo_medio_ponderado INTO custo_atual
        FROM custos WHERE produto_id = NEW.produto_id;
        
        IF custo_atual IS NULL THEN
            custo_atual := 0;
        END IF;
        
        -- Calcular novo custo médio ponderado
        IF saldo_atual + NEW.quantidade > 0 THEN
            novo_custo := ((saldo_atual * custo_atual) + (NEW.quantidade * NEW.custo_unitario)) / (saldo_atual + NEW.quantidade);
            
            -- Atualizar tabela de custos
            INSERT INTO custos (produto_id, custo_ultima_compra, custo_medio_ponderado)
            VALUES (NEW.produto_id, NEW.custo_unitario, novo_custo)
            ON CONFLICT (produto_id) DO UPDATE SET
                custo_ultima_compra = NEW.custo_unitario,
                custo_medio_ponderado = novo_custo,
                data_ultima_atualizacao = CURRENT_TIMESTAMP;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_custo_medio
    AFTER INSERT ON movimentacoes
    FOR EACH ROW EXECUTE FUNCTION atualizar_custo_medio();

-- Dados de Exemplo (Seed Data)

-- Loja padrão
INSERT INTO lojas (id, nome, cnpj, endereco) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Supermercado Central', '12.345.678/0001-90', 'Rua Principal, 123');

-- Categorias básicas
INSERT INTO categorias (nome, codigo) VALUES 
('Alimentícios', 'ALIM'),
('Bebidas', 'BEB'),
('Limpeza', 'LIMP'),
('Higiene', 'HIG'),
('Padaria', 'PAD');

-- Locais padrão
INSERT INTO locais (loja_id, nome, tipo) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Depósito Central', 'deposito'),
('550e8400-e29b-41d4-a716-446655440000', 'Gôndola A', 'gondola'),
('550e8400-e29b-41d4-a716-446655440000', 'Câmara Fria', 'camara');

-- Usuário administrador padrão (idempotente)
INSERT INTO usuarios (nome, email, senha_hash, perfil, loja_id)
VALUES (
    'Administrador',
    'admin@supermercado.com',
    crypt('password', gen_salt('bf')),
    'admin',
    '550e8400-e29b-41d4-a716-446655440000'
)
ON CONFLICT (email) DO UPDATE SET
    senha_hash = EXCLUDED.senha_hash,
    perfil = EXCLUDED.perfil,
    loja_id = EXCLUDED.loja_id,
    updated_at = CURRENT_TIMESTAMP;
