package produto

import (
	"context"

	"github.com/google/uuid"
	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/domain/repository"
)

// CreateProdutoUseCase is the use case for creating a new product.
type CreateProdutoUseCase struct {
	produtoRepo repository.ProdutoRepository
}

// NewCreateProdutoUseCase creates a new CreateProdutoUseCase.
func NewCreateProdutoUseCase(produtoRepo repository.ProdutoRepository) *CreateProdutoUseCase {
	return &CreateProdutoUseCase{produtoRepo: produtoRepo}
}

// Execute executes the use case.
func (uc *CreateProdutoUseCase) Execute(ctx context.Context, input CreateProdutoInputDTO) error {
	produto := &entity.Produto{
		EAN:           input.EAN,
		Nome:          input.Nome,
		Descricao:     input.Descricao,
		Marca:         input.Marca,
		CategoriaID:   input.CategoriaID,
		NCM:           input.NCM,
		Unidade:       input.Unidade,
		PesoKG:        input.PesoKG,
		VolumeML:      input.VolumeML,
		Embalagem:     input.Embalagem,
		MultiploVenda: input.MultiploVenda,
		Perecivel:     input.Perecivel,
		ControlaLote:  input.ControlaLote,
		Ativo:         true, // Products are active by default
	}

	return uc.produtoRepo.Create(ctx, produto)
}

// CreateProdutoInputDTO is the input data transfer object for creating a product.
type CreateProdutoInputDTO struct {
	EAN           string    `json:"ean"`
	Nome          string    `json:"nome" validate:"required"`
	Descricao     string    `json:"descricao"`
	Marca         string    `json:"marca"`
	CategoriaID   uuid.UUID `json:"categoria_id" validate:"required"`
	NCM           string    `json:"ncm"`
	Unidade       string    `json:"unidade"`
	PesoKG        float64   `json:"peso_kg"`
	VolumeML      float64   `json:"volume_ml"`
	Embalagem     string    `json:"embalagem"`
	MultiploVenda int       `json:"multiplo_venda"`
	Perecivel     bool      `json:"perecivel"`
	ControlaLote  bool      `json:"controla_lote"`
}
