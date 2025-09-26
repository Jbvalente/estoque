package produto

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/domain/repository"
)

// ListCategoriasUseCase is the use case for listing categories.
type ListCategoriasUseCase struct {
	categoriaRepo repository.CategoriaRepository
}

// NewListCategoriasUseCase creates a new ListCategoriasUseCase.
func NewListCategoriasUseCase(categoriaRepo repository.CategoriaRepository) *ListCategoriasUseCase {
	return &ListCategoriasUseCase{categoriaRepo: categoriaRepo}
}

// Execute executes the use case.
func (uc *ListCategoriasUseCase) Execute(ctx context.Context) ([]*entity.Categoria, error) {
	return uc.categoriaRepo.FindAll(ctx)
}
