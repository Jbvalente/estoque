package entity

import (
	"time"

	"github.com/google/uuid"
)

// Lote represents a batch of a product.
type Lote struct {
	ID              uuid.UUID `json:"id"`
	ProdutoID       uuid.UUID `json:"produto_id"`
	NumeroLote      string    `json:"numero_lote"`
	DataFabricacao  time.Time `json:"data_fabricacao"`
	DataValidade    time.Time `json:"data_validade"`
	FornecedorID    uuid.UUID `json:"fornecedor_id"`
	NotaFiscal      string    `json:"nota_fiscal"`
	CustoUnitario   float64   `json:"custo_unitario"`
	Observacoes     string    `json:"observacoes"`
	CreatedAt       time.Time `json:"created_at"`
}
