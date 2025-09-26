package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CreateProduto(ctx context.Context, arg CreateProdutoParams) (Produto, error)
	DeleteProduto(ctx context.Context, id uuid.UUID) error
	GetProduto(ctx context.Context, id uuid.UUID) (Produto, error)
	GetUserByEmail(ctx context.Context, email string) (Usuario, error)
	ListCategorias(ctx context.Context) ([]Categoria, error)
	ListProdutos(ctx context.Context, arg ListProdutosParams) ([]ListProdutosRow, error)
	UpdateProduto(ctx context.Context, arg UpdateProdutoParams) (Produto, error)
}

var _ Querier = (*Queries)(nil)
