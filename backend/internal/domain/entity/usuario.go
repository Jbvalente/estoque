package entity

import (
	"time"

	"github.com/google/uuid"
)

// Usuario represents a user of the system.
type Usuario struct {
	ID          uuid.UUID `json:"id"`
	Nome        string    `json:"nome"`
	Email       string    `json:"email"`
	SenhaHash   string    `json:"-"` // Do not expose password hash
	Perfil      string    `json:"perfil"`
	LojaID      uuid.UUID `json:"loja_id"`
	Ativo       bool      `json:"ativo"`
	UltimoLogin time.Time `json:"ultimo_login"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
