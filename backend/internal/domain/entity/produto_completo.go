package entity

import (
	"time"

	"github.com/google/uuid"
)

// ProdutoCompleto represents a product with additional details like price and category name.
type ProdutoCompleto struct {
	ID            uuid.UUID `json:"id"`
	EAN           string    `json:"ean"`
	Nome          string    `json:"nome"`
	Descricao     string    `json:"descricao"`
	Marca         string    `json:"marca"`
	CategoriaID   uuid.UUID `json:"categoria_id"`
	CategoriaNome string    `json:"categoria_nome"`
	NCM           string    `json:"ncm"`
	Unidade       string    `json:"unidade"`
	PesoKG        float64   `json:"peso_kg"`
	VolumeML      float64   `json:"volume_ml"`
	Embalagem     string    `json:"embalagem"`
	MultiploVenda int       `json:"multiplo_venda"`
	Perecivel     bool      `json:"perecivel"`
	ControlaLote  bool      `json:"controla_lote"`
	Ativo         bool      `json:"ativo"`
	PrecoVenda    float64   `json:"preco_venda"`
	Margem        float64   `json:"margem"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
