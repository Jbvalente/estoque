package produto

import (
	"context"

	"github.com/google/uuid"
	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/domain/repository"
)

// GetProdutoUseCase is the use case for getting a product by its ID.
type GetProdutoUseCase struct {
	produtoRepo repository.ProdutoRepository
}

// NewGetProdutoUseCase creates a new GetProdutoUseCase.
func NewGetProdutoUseCase(produtoRepo repository.ProdutoRepository) *GetProdutoUseCase {
	return &GetProdutoUseCase{produtoRepo: produtoRepo}
}

// Execute executes the use case.
func (uc *GetProdutoUseCase) Execute(ctx context.Context, id uuid.UUID) (*entity.Produto, error) {
	return uc.produtoRepo.FindByID(ctx, id)
}
