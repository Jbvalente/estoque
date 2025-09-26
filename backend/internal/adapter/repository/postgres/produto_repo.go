package postgres

import (
	"context"
	"fmt"
	"strconv"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/infra/db"
)

// ProdutoRepositoryPG is a PostgreSQL implementation of the ProdutoRepository.
type ProdutoRepositoryPG struct {
	queries *db.Queries
}

// NewProdutoRepositoryPG creates a new ProdutoRepositoryPG.
func NewProdutoRepositoryPG(queries *db.Queries) *ProdutoRepositoryPG {
	return &ProdutoRepositoryPG{queries: queries}
}

// Create creates a new product.
func (r *ProdutoRepositoryPG) Create(ctx context.Context, produto *entity.Produto) error {
	params := db.CreateProdutoParams{
		Ean:          pgtype.Text{String: produto.EAN, Valid: produto.EAN != ""},
		Nome:         produto.Nome,
		Descricao:    pgtype.Text{String: produto.Descricao, Valid: produto.Descricao != ""},
		Marca:        pgtype.Text{String: produto.Marca, Valid: produto.Marca != ""},
		CategoriaID:  pgtype.UUID{Bytes: produto.CategoriaID, Valid: produto.CategoriaID != uuid.Nil},
		Ncm:          pgtype.Text{String: produto.NCM, Valid: produto.NCM != ""},
		Unidade:      pgtype.Text{String: produto.Unidade, Valid: produto.Unidade != ""},
		Embalagem:    pgtype.Text{String: produto.Embalagem, Valid: produto.Embalagem != ""},
		MultiploVenda: pgtype.Int4{Int32: int32(produto.MultiploVenda), Valid: true},
		Perecivel:    pgtype.Bool{Bool: produto.Perecivel, Valid: true},
		ControlaLote: pgtype.Bool{Bool: produto.ControlaLote, Valid: true},
		Ativo:        pgtype.Bool{Bool: produto.Ativo, Valid: true},
	}

	// Handle Numeric types
	params.PesoKg.Scan(fmt.Sprintf("%f", produto.PesoKG))
	params.VolumeMl.Scan(fmt.Sprintf("%f", produto.VolumeML))

	_, err := r.queries.CreateProduto(ctx, params)
	return err
}

// FindByID finds a product by its ID.
func (r *ProdutoRepositoryPG) FindByID(ctx context.Context, id uuid.UUID) (*entity.Produto, error) {
	dbProduto, err := r.queries.GetProduto(ctx, id)
	if err != nil {
		return nil, err
	}

	return toProdutoEntity(dbProduto), nil
}

// FindAllCompletos finds all products with complete information.
func (r *ProdutoRepositoryPG) FindAllCompletos(ctx context.Context, page, limit int, sortBy string) ([]*entity.ProdutoCompleto, error) {
	params := db.ListProdutosParams{
		Limit:  int32(limit),
		Offset: int32((page - 1) * limit),
	}
	dbProdutos, err := r.queries.ListProdutos(ctx, params)
	if err != nil {
		return nil, err
	}

	var produtos []*entity.ProdutoCompleto
	for _, dbProduto := range dbProdutos {
		produtos = append(produtos, toProdutoCompletoEntity(dbProduto))
	}
	return produtos, nil
}

// Update updates a product.
func (r *ProdutoRepositoryPG) Update(ctx context.Context, produto *entity.Produto) error {
	params := db.UpdateProdutoParams{
		ID:           produto.ID,
		Ean:          pgtype.Text{String: produto.EAN, Valid: produto.EAN != ""},
		Nome:         produto.Nome,
		Descricao:    pgtype.Text{String: produto.Descricao, Valid: produto.Descricao != ""},
		Marca:        pgtype.Text{String: produto.Marca, Valid: produto.Marca != ""},
		CategoriaID:  pgtype.UUID{Bytes: produto.CategoriaID, Valid: produto.CategoriaID != uuid.Nil},
		Ncm:          pgtype.Text{String: produto.NCM, Valid: produto.NCM != ""},
		Unidade:      pgtype.Text{String: produto.Unidade, Valid: produto.Unidade != ""},
		Embalagem:    pgtype.Text{String: produto.Embalagem, Valid: produto.Embalagem != ""},
		MultiploVenda: pgtype.Int4{Int32: int32(produto.MultiploVenda), Valid: true},
		Perecivel:    pgtype.Bool{Bool: produto.Perecivel, Valid: true},
		ControlaLote: pgtype.Bool{Bool: produto.ControlaLote, Valid: true},
		Ativo:        pgtype.Bool{Bool: produto.Ativo, Valid: true},
	}

	// Handle Numeric types
	params.PesoKg.Scan(fmt.Sprintf("%f", produto.PesoKG))
	params.VolumeMl.Scan(fmt.Sprintf("%f", produto.VolumeML))

	_, err := r.queries.UpdateProduto(ctx, params)
	return err
}

// Delete deletes a product by its ID.
func (r *ProdutoRepositoryPG) Delete(ctx context.Context, id uuid.UUID) error {
	return r.queries.DeleteProduto(ctx, id)
}

// toProdutoEntity converts a db.Produto to an entity.Produto.
func toProdutoEntity(dbProduto db.Produto) *entity.Produto {
	produto := &entity.Produto{
		ID:            dbProduto.ID,
		Nome:          dbProduto.Nome,
		EAN:           dbProduto.Ean.String,
		Descricao:     dbProduto.Descricao.String,
		Marca:         dbProduto.Marca.String,
		CategoriaID:   dbProduto.CategoriaID.UUID,
		NCM:           dbProduto.Ncm.String,
		Unidade:       dbProduto.Unidade.String,
		Embalagem:     dbProduto.Embalagem.String,
		MultiploVenda: int(dbProduto.MultiploVenda.Int32),
		Perecivel:     dbProduto.Perecivel.Bool,
		ControlaLote:  dbProduto.ControlaLote.Bool,
		Ativo:         dbProduto.Ativo.Bool,
		CreatedAt:     dbProduto.CreatedAt.Time,
		UpdatedAt:     dbProduto.UpdatedAt.Time,
	}

	if dbProduto.PesoKg.Valid {
		fmt.Sscanf(dbProduto.PesoKg.String, "%f", &produto.PesoKG)
	}
	if dbProduto.VolumeMl.Valid {
		fmt.Sscanf(dbProduto.VolumeMl.String, "%f", &produto.VolumeML)
	}

	return produto
}

// toProdutoCompletoEntity converts a db.ListProdutosRow to an entity.ProdutoCompleto.
func toProdutoCompletoEntity(dbProduto db.ListProdutosRow) *entity.ProdutoCompleto {
	produto := &entity.ProdutoCompleto{
		ID:            dbProduto.ID,
		Nome:          dbProduto.Nome,
		EAN:           dbProduto.Ean.String,
		Descricao:     dbProduto.Descricao.String,
		Marca:         dbProduto.Marca.String,
		CategoriaID:   dbProduto.CategoriaID.UUID,
		CategoriaNome: dbProduto.CategoriaNome.String,
		NCM:           dbProduto.Ncm.String,
		Unidade:       dbProduto.Unidade.String,
		Embalagem:     dbProduto.Embalagem.String,
		MultiploVenda: int(dbProduto.MultiploVenda.Int32),
		Perecivel:     dbProduto.Perecivel.Bool,
		ControlaLote:  dbProduto.ControlaLote.Bool,
		Ativo:         dbProduto.Ativo.Bool,
		CreatedAt:     dbProduto.CreatedAt.Time,
		UpdatedAt:     dbProduto.UpdatedAt.Time,
	}

	if dbProduto.PesoKg.Valid {
		fmt.Sscanf(dbProduto.PesoKg.String, "%f", &produto.PesoKG)
	}
	if dbProduto.VolumeMl.Valid {
		fmt.Sscanf(dbProduto.VolumeMl.String, "%f", &produto.VolumeML)
	}
	if dbProduto.PrecoVenda.Valid {
		preco, _ := strconv.ParseFloat(dbProduto.PrecoVenda.String, 64)
		produto.PrecoVenda = preco
	}
	if dbProduto.Margem.Valid {
		margem, _ := strconv.ParseFloat(dbProduto.Margem.String, 64)
		produto.Margem = margem
	}

	return produto
}
