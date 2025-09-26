package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jbavalente/estoque/internal/domain/entity"
)

// ProdutoRepository defines the interface for interacting with product data.
type ProdutoRepository interface {
	Create(ctx context.Context, produto *entity.Produto) error
	FindByID(ctx context.Context, id uuid.UUID) (*entity.Produto, error)
	FindAllCompletos(ctx context.Context, page, limit int, sortBy string) ([]*entity.ProdutoCompleto, error)
	Update(ctx context.Context, produto *entity.Produto) error
	Delete(ctx context.Context, id uuid.UUID) error
}