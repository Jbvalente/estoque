package repository

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
)

// UsuarioRepository defines the interface for interacting with user data.
type UsuarioRepository interface {
	FindByEmail(ctx context.Context, email string) (*entity.Usuario, error)
	// TODO: Add Create method for user registration if needed
}
