package entity

import (
	"time"

	"github.com/google/uuid"
)

// Movimentacao represents a stock movement.
type Movimentacao struct {
	ID              uuid.UUID `json:"id"`
	Tipo            string    `json:"tipo"`
	ProdutoID       uuid.UUID `json:"produto_id"`
	LoteID          uuid.UUID `json:"lote_id"`
	LocalOrigemID   uuid.UUID `json:"local_origem_id"`
	LocalDestinoID  uuid.UUID `json:"local_destino_id"`
	Quantidade      float64   `json:"quantidade"`
	CustoUnitario   float64   `json:"custo_unitario"`
	PrecoUnitario   float64   `json:"preco_unitario"`
	Motivo          string    `json:"motivo"`
	Documento       string    `json:"documento"`
	UsuarioID       uuid.UUID `json:"usuario_id"`
	Observacoes     string    `json:"observacoes"`
	CreatedAt       time.Time `json:"created_at"`
}
