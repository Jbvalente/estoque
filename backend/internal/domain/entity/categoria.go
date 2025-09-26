package entity

import (
	"time"

	"github.com/google/uuid"
)

// Categoria represents a product category.
type Categoria struct {
	ID          uuid.UUID `json:"id"`
	Nome        string    `json:"nome"`
	Descricao   string    `json:"descricao"`
	Codigo      string    `json:"codigo"`
	Ativo       bool      `json:"ativo"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
