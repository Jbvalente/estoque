package entity

import (
	"time"

	"github.com/google/uuid"
)

// Fornecedor represents a supplier.
type Fornecedor struct {
	ID            uuid.UUID `json:"id"`
	Nome          string    `json:"nome"`
	CNPJ          string    `json:"cnpj"`
	Contato       string    `json:"contato"`
	Telefone      string    `json:"telefone"`
	Email         string    `json:"email"`
	Endereco      string    `json:"endereco"`
	LeadTimeDias  int       `json:"lead_time_dias"`
	Ativo         bool      `json:"ativo"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
