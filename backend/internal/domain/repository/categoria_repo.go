package repository

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
)

// CategoriaRepository defines the interface for interacting with category data.
type CategoriaRepository interface {
	FindAll(ctx context.Context) ([]*entity.Categoria, error)
}
