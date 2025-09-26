
package db

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Categoria struct {
	ID        uuid.UUID    `json:"id"`
	Nome      string       `json:"nome"`
	Descricao sql.NullString `json:"descricao"`
	Codigo    sql.NullString `json:"codigo"`
	Ativo     sql.NullBool `json:"ativo"`
	CreatedAt sql.NullTime `json:"created_at"`
	UpdatedAt sql.NullTime `json:"updated_at"`
}

type Configuraco struct {
	Chave     string       `json:"chave"`
	Valor     string       `json:"valor"`
	Descricao sql.NullString `json:"descricao"`
	Tipo      sql.NullString `json:"tipo"`
	UpdatedAt sql.NullTime `json:"updated_at"`
}

type Custo struct {
	ID                     uuid.UUID    `json:"id"`
	ProdutoID              uuid.UUID    `json:"produto_id"`
	CustoUltimaCompra      sql.NullString `json:"custo_ultima_compra"`
	CustoMedioPonderado    sql.NullString `json:"custo_medio_ponderado"`
	CustoPadrao            sql.NullString `json:"custo_padrao"`
	ImpostosPct            sql.NullString `json:"impostos_pct"`
	FreteUnit              sql.NullString `json:"frete_unit"`
	OutrosCustos           sql.NullString `json:"outros_custos"`
	DataUltimaAtualizacao sql.NullTime `json:"data_ultima_atualizacao"`
	CreatedAt              sql.NullTime `json:"created_at"`
	UpdatedAt              sql.NullTime `json:"updated_at"`
}

type Fornecedore struct {
	ID           uuid.UUID    `json:"id"`
	Nome         string       `json:"nome"`
	Cnpj         sql.NullString `json:"cnpj"`
	Contato      sql.NullString `json:"contato"`
	Telefone     sql.NullString `json:"telefone"`
	Email        sql.NullString `json:"email"`
	Endereco     sql.NullString `json:"endereco"`
	LeadTimeDias sql.NullInt32 `json:"lead_time_dias"`
	Ativo        sql.NullBool `json:"ativo"`
	CreatedAt    sql.NullTime `json:"created_at"`
	UpdatedAt    sql.NullTime `json:"updated_at"`
}

type Inventario struct {
	ID           uuid.UUID    `json:"id"`
	LojaID       uuid.UUID    `json:"loja_id"`
	Nome         string       `json:"nome"`
	Setor        sql.NullString `json:"setor"`
	DataInicio   time.Time    `json:"data_inicio"`
	DataFim      sql.NullTime `json:"data_fim"`
	Status       sql.NullString `json:"status"`
	Responsaveis []string     `json:"responsaveis"`
	Observacoes  sql.NullString `json:"observacoes"`
	CreatedAt    sql.NullTime `json:"created_at"`
	UpdatedAt    sql.NullTime `json:"updated_at"`
}

type InventarioColeta struct {
	ID                uuid.UUID    `json:"id"`
	InventarioID      uuid.UUID    `json:"inventario_id"`
	ProdutoID         uuid.UUID    `json:"produto_id"`
	LoteID            uuid.NullUUID `json:"lote_id"`
	LocalID           uuid.UUID    `json:"local_id"`
	QuantidadeSistema string       `json:"quantidade_sistema"`
	QuantidadeContada string       `json:"quantidade_contada"`
	Diferenca         sql.NullString `json:"diferenca"`
	UsuarioColeta     sql.NullString `json:"usuario_coleta"`
	Observacoes       sql.NullString `json:"observacoes"`
	CreatedAt         sql.NullTime `json:"created_at"`
}

type Loja struct {
	ID        uuid.UUID    `json:"id"`
	Nome      string       `json:"nome"`
	Cnpj      sql.NullString `json:"cnpj"`
	Endereco  sql.NullString `json:"endereco"`
	Telefone  sql.NullString `json:"telefone"`
	Ativo     sql.NullBool `json:"ativo"`
	CreatedAt sql.NullTime `json:"created_at"`
	UpdatedAt sql.NullTime `json:"updated_at"`
}

type Locai struct {
	ID             uuid.UUID    `json:"id"`
	LojaID         uuid.UUID    `json:"loja_id"`
	Nome           string       `json:"nome"`
	Tipo           string       `json:"tipo"`
	CapacidadeMax  sql.NullInt32 `json:"capacidade_max"`
	TemperaturaMin sql.NullString `json:"temperatura_min"`
	TemperaturaMax sql.NullString `json:"temperatura_max"`
	Observacoes    sql.NullString `json:"observacoes"`
	Ativo          sql.NullBool `json:"ativo"`
	CreatedAt      sql.NullTime `json:"created_at"`
}

type Lote struct {
	ID             uuid.UUID    `json:"id"`
	ProdutoID      uuid.UUID    `json:"produto_id"`
	NumeroLote     string       `json:"numero_lote"`
	DataFabricacao sql.NullTime `json:"data_fabricacao"`
	DataValidade   sql.NullTime `json:"data_validade"`
	FornecedorID   uuid.NullUUID `json:"fornecedor_id"`
	NotaFiscal     sql.NullString `json:"nota_fiscal"`
	CustoUnitario  sql.NullString `json:"custo_unitario"`
	Observacoes    sql.NullString `json:"observacoes"`
	CreatedAt      sql.NullTime `json:"created_at"`
}

type Movimentacoe struct {
	ID              uuid.UUID    `json:"id"`
	Tipo            string       `json:"tipo"`
	ProdutoID       uuid.UUID    `json:"produto_id"`
	LoteID          uuid.NullUUID `json:"lote_id"`
	LocalOrigemID   uuid.NullUUID `json:"local_origem_id"`
	LocalDestinoID  uuid.NullUUID `json:"local_destino_id"`
	Quantidade      string       `json:"quantidade"`
	CustoUnitario   sql.NullString `json:"custo_unitario"`
	PrecoUnitario   sql.NullString `json:"preco_unitario"`
	Motivo          sql.NullString `json:"motivo"`
	Documento       sql.NullString `json:"documento"`
	UsuarioID       uuid.NullUUID `json:"usuario_id"`
	Observacoes     sql.NullString `json:"observacoes"`
	CreatedAt       sql.NullTime `json:"created_at"`
}

type Preco struct {
	ID             uuid.UUID    `json:"id"`
	ProdutoID      uuid.UUID    `json:"produto_id"`
	LojaID         uuid.NullUUID `json:"loja_id"`
	PrecoVenda     string       `json:"preco_venda"`
	Tabela         sql.NullString `json:"tabela"`
	MargemMinima   sql.NullString `json:"margem_minima"`
	VigenciaInicio sql.NullTime `json:"vigencia_inicio"`
	VigenciaFim    sql.NullTime `json:"vigencia_fim"`
	Ativo          sql.NullBool `json:"ativo"`
	CreatedAt      sql.NullTime `json:"created_at"`
	UpdatedAt      sql.NullTime `json:"updated_at"`
}

type Produto struct {
	ID            uuid.UUID    `json:"id"`
	Ean           sql.NullString `json:"ean"`
	Nome          string       `json:"nome"`
	Descricao     sql.NullString `json:"descricao"`
	Marca         sql.NullString `json:"marca"`
	CategoriaID   uuid.NullUUID `json:"categoria_id"`
	Ncm           sql.NullString `json:"ncm"`
	Unidade       sql.NullString `json:"unidade"`
	PesoKg        sql.NullString `json:"peso_kg"`
	VolumeMl      sql.NullString `json:"volume_ml"`
	Embalagem     sql.NullString `json:"embalagem"`
	MultiploVenda sql.NullInt32 `json:"multiplo_venda"`
	Perecivel     sql.NullBool `json:"perecivel"`
	ControlaLote  sql.NullBool `json:"controla_lote"`
	Ativo         sql.NullBool `json:"ativo"`
	CreatedAt     sql.NullTime `json:"created_at"`
	UpdatedAt     sql.NullTime `json:"updated_at"`
}

type ProdutosFornecedore struct {
	ID               uuid.UUID    `json:"id"`
	ProdutoID        uuid.UUID    `json:"produto_id"`
	FornecedorID     uuid.UUID    `json:"fornecedor_id"`
	CodigoFornecedor sql.NullString `json:"codigo_fornecedor"`
	Principal        sql.NullBool `json:"principal"`
	CustoPadrao      sql.NullString `json:"custo_padrao"`
	CreatedAt        sql.NullTime `json:"created_at"`
}

type SaldosLote struct {
	ID        uuid.UUID    `json:"id"`
	LoteID    uuid.UUID    `json:"lote_id"`
	LocalID   uuid.UUID    `json:"local_id"`
	Saldo     string       `json:"saldo"`
	Reservado string       `json:"reservado"`
	UpdatedAt sql.NullTime `json:"updated_at"`
}

type Usuario struct {
	ID         uuid.UUID    `json:"id"`
	Nome       string       `json:"nome"`
	Email      string       `json:"email"`
	SenhaHash  string       `json:"senha_hash"`
	Perfil     string       `json:"perfil"`
	LojaID     uuid.NullUUID `json:"loja_id"`
	Ativo      sql.NullBool `json:"ativo"`
	UltimoLogin sql.NullTime `json:"ultimo_login"`
	CreatedAt  sql.NullTime `json:"created_at"`
	UpdatedAt  sql.NullTime `json:"updated_at"`
}

type Venda struct {
	ID            uuid.UUID    `json:"id"`
	ProdutoID     uuid.UUID    `json:"produto_id"`
	LojaID        uuid.UUID    `json:"loja_id"`
	Quantidade    string       `json:"quantidade"`
	PrecoUnitario string       `json:"preco_unitario"`
	Desconto      sql.NullString `json:"desconto"`
	CustoUnitario sql.NullString `json:"custo_unitario"`
	CupomFiscal   sql.NullString `json:"cupom_fiscal"`
	Pdv           sql.NullString `json:"pdv"`
	VendedorID    uuid.NullUUID `json:"vendedor_id"`
	CreatedAt     sql.NullTime `json:"created_at"`
}

type ListProdutosRow struct {
	ID             uuid.UUID      `json:"id"`
	Ean            sql.NullString `json:"ean"`
	Nome           string         `json:"nome"`
	Descricao      sql.NullString `json:"descricao"`
	Marca          sql.NullString `json:"marca"`
	CategoriaID    uuid.NullUUID  `json:"categoria_id"`
	Ncm            sql.NullString `json:"ncm"`
	Unidade        sql.NullString `json:"unidade"`
	PesoKg         sql.NullString `json:"peso_kg"`
	VolumeMl       sql.NullString `json:"volume_ml"`
	Embalagem      sql.NullString `json:"embalagem"`
	MultiploVenda  sql.NullInt32  `json:"multiplo_venda"`
	Perecivel      sql.NullBool   `json:"perecivel"`
	ControlaLote   sql.NullBool   `json:"controla_lote"`
	Ativo          sql.NullBool   `json:"ativo"`
	CreatedAt      sql.NullTime   `json:"created_at"`
	UpdatedAt      sql.NullTime   `json:"updated_at"`
	PrecoVenda     sql.NullString `json:"preco_venda"`
	CategoriaNome  sql.NullString `json:"categoria_nome"`
	Margem         sql.NullString `json:"margem"`
}
