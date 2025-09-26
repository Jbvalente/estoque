package produto

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/domain/repository"
)

// ListProdutosUseCase is the use case for listing products.
type ListProdutosUseCase struct {
	produtoRepo repository.ProdutoRepository
}

// NewListProdutosUseCase creates a new ListProdutosUseCase.
func NewListProdutosUseCase(produtoRepo repository.ProdutoRepository) *ListProdutosUseCase {
	return &ListProdutosUseCase{produtoRepo: produtoRepo}
}

// Execute executes the use case.
func (uc *ListProdutosUseCase) Execute(ctx context.Context, input ListProdutosInputDTO) ([]*entity.ProdutoCompleto, error) {
	return uc.produtoRepo.FindAllCompletos(ctx, input.Page, input.Limit, input.SortBy)
}

// ListProdutosInputDTO is the input data transfer object for listing products.
type ListProdutosInputDTO struct {
	Page   int    `form:"page,default=1"`
	Limit  int    `form:"limit,default=10"`
	SortBy string `form:"sortBy,default=nome"`
}
