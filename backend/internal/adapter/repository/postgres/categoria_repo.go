package postgres

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/infra/db"
)

// CategoriaRepositoryPG is a PostgreSQL implementation of the CategoriaRepository.
type CategoriaRepositoryPG struct {
	queries *db.Queries
}

// NewCategoriaRepositoryPG creates a new CategoriaRepositoryPG.
func NewCategoriaRepositoryPG(queries *db.Queries) *CategoriaRepositoryPG {
	return &CategoriaRepositoryPG{queries: queries}
}

// FindAll finds all categories.
func (r *CategoriaRepositoryPG) FindAll(ctx context.Context) ([]*entity.Categoria, error) {
	dbCategorias, err := r.queries.ListCategorias(ctx)
	if err != nil {
		return nil, err
	}

	var categorias []*entity.Categoria
	for _, dbCategoria := range dbCategorias {
		categorias = append(categorias, toCategoriaEntity(dbCategoria))
	}
	return categorias, nil
}

func toCategoriaEntity(dbCategoria db.Categoria) *entity.Categoria {
	return &entity.Categoria{
		ID:        dbCategoria.ID,
		Nome:      dbCategoria.Nome,
		Descricao: dbCategoria.Descricao.String,
		Codigo:    dbCategoria.Codigo.String,
		Ativo:     dbCategoria.Ativo.Bool,
		CreatedAt: dbCategoria.CreatedAt.Time,
		UpdatedAt: dbCategoria.UpdatedAt.Time,
	}
}
