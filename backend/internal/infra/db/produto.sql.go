package db

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const createProduto = `-- name: CreateProduto :one
INSERT INTO produtos (
    ean, nome, descricao, marca, categoria_id, ncm, unidade, peso_kg, volume_ml, embalagem, multiplo_venda, perecivel, controla_lote, ativo
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
) RETURNING id, ean, nome, descricao, marca, categoria_id, ncm, unidade, peso_kg, volume_ml, embalagem, multiplo_venda, perecivel, controla_lote, ativo, created_at, updated_at
`

type CreateProdutoParams struct {
	Ean          pgtype.Text      `json:"ean"`
	Nome         string           `json:"nome"`
	Descricao    pgtype.Text      `json:"descricao"`
	Marca        pgtype.Text      `json:"marca"`
	CategoriaID  pgtype.UUID      `json:"categoria_id"`
	Ncm          pgtype.Text      `json:"ncm"`
	Unidade      pgtype.Text      `json:"unidade"`
	PesoKg       pgtype.Numeric   `json:"peso_kg"`
	VolumeMl     pgtype.Numeric   `json:"volume_ml"`
	Embalagem    pgtype.Text      `json:"embalagem"`
	MultiploVenda pgtype.Int4      `json:"multiplo_venda"`
	Perecivel    pgtype.Bool      `json:"perecivel"`
	ControlaLote pgtype.Bool      `json:"controla_lote"`
	Ativo        pgtype.Bool      `json:"ativo"`
}

func (q *Queries) CreateProduto(ctx context.Context, arg CreateProdutoParams) (Produto, error) {
	row := q.db.QueryRow(ctx, createProduto,
		arg.Ean,
		arg.Nome,
		arg.Descricao,
		arg.Marca,
		arg.CategoriaID,
		arg.Ncm,
		arg.Unidade,
		arg.PesoKg,
		arg.VolumeMl,
		arg.Embalagem,
		arg.MultiploVenda,
		arg.Perecivel,
		arg.ControlaLote,
		arg.Ativo,
	)
	var i Produto
	err := row.Scan(
		&i.ID,
		&i.Ean,
		&i.Nome,
		&i.Descricao,
		&i.Marca,
		&i.CategoriaID,
		&i.Ncm,
		&i.Unidade,
		&i.PesoKg,
		&i.VolumeMl,
		&i.Embalagem,
		&i.MultiploVenda,
		&i.Perecivel,
		&i.ControlaLote,
		&i.Ativo,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteProduto = `-- name: DeleteProduto :exec
DELETE FROM produtos
WHERE id = $1
`

func (q *Queries) DeleteProduto(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteProduto, id)
	return err
}

const getProduto = `-- name: GetProduto :one
SELECT id, ean, nome, descricao, marca, categoria_id, ncm, unidade, peso_kg, volume_ml, embalagem, multiplo_venda, perecivel, controla_lote, ativo, created_at, updated_at FROM produtos
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetProduto(ctx context.Context, id uuid.UUID) (Produto, error) {
	row := q.db.QueryRow(ctx, getProduto, id)
	var i Produto
	err := row.Scan(
		&i.ID,
		&i.Ean,
		&i.Nome,
		&i.Descricao,
		&i.Marca,
		&i.CategoriaID,
		&i.Ncm,
		&i.Unidade,
		&i.PesoKg,
		&i.VolumeMl,
		&i.Embalagem,
		&i.MultiploVenda,
		&i.Perecivel,
		&i.ControlaLote,
		&i.Ativo,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listProdutos = `-- name: ListProdutos :many
SELECT 
    p.*,
    pr.preco_venda,
    c.nome as categoria_nome,
    ((pr.preco_venda - cs.custo_medio_ponderado) / pr.preco_venda) * 100 as margem
FROM 
    produtos p
LEFT JOIN 
    precos pr ON p.id = pr.produto_id AND pr.tabela = 'padrao' -- Assuming 'padrao' is the default price table
LEFT JOIN 
    custos cs ON p.id = cs.produto_id
LEFT JOIN
    categorias c ON p.categoria_id = c.id
WHERE 
    p.ativo = true
ORDER BY 
    p.nome
LIMIT $1
OFFSET $2
`

type ListProdutosParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListProdutos(ctx context.Context, arg ListProdutosParams) ([]ListProdutosRow, error) {
	rows, err := q.db.Query(ctx, listProdutos, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListProdutosRow
	for rows.Next() {
		var i ListProdutosRow
		if err := rows.Scan(
			&i.ID,
			&i.Ean,
			&i.Nome,
			&i.Descricao,
			&i.Marca,
			&i.CategoriaID,
			&i.Ncm,
			&i.Unidade,
			&i.PesoKg,
			&i.VolumeMl,
			&i.Embalagem,
			&i.MultiploVenda,
			&i.Perecivel,
			&i.ControlaLote,
			&i.Ativo,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PrecoVenda,
			&i.CategoriaNome,
			&i.Margem,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateProduto = `-- name: UpdateProduto :one
UPDATE produtos
SET 
    ean = $2,
    nome = $3,
    descricao = $4,
    marca = $5,
    categoria_id = $6,
    ncm = $7,
    unidade = $8,
    peso_kg = $9,
    volume_ml = $10,
    embalagem = $11,
    multiplo_venda = $12,
    perecivel = $13,
    controla_lote = $14,
    ativo = $15,
    updated_at = NOW()
WHERE id = $1
RETURNING id, ean, nome, descricao, marca, categoria_id, ncm, unidade, peso_kg, volume_ml, embalagem, multiplo_venda, perecivel, controla_lote, ativo, created_at, updated_at
`

type UpdateProdutoParams struct {
	ID           uuid.UUID        `json:"id"`
	Ean          pgtype.Text      `json:"ean"`
	Nome         string           `json:"nome"`
	Descricao    pgtype.Text      `json:"descricao"`
	Marca        pgtype.Text      `json:"marca"`
	CategoriaID  pgtype.UUID      `json:"categoria_id"`
	Ncm          pgtype.Text      `json:"ncm"`
	Unidade      pgtype.Text      `json:"unidade"`
	PesoKg       pgtype.Numeric   `json:"peso_kg"`
	VolumeMl     pgtype.Numeric   `json:"volume_ml"`
	Embalagem    pgtype.Text      `json:"embalagem"`
	MultiploVenda pgtype.Int4      `json:"multiplo_venda"`
	Perecivel    pgtype.Bool      `json:"perecivel"`
	ControlaLote pgtype.Bool      `json:"controla_lote"`
	Ativo        pgtype.Bool      `json:"ativo"`
}

func (q *Queries) UpdateProduto(ctx context.Context, arg UpdateProdutoParams) (Produto, error) {
	row := q.db.QueryRow(ctx, updateProduto,
		arg.ID,
		arg.Ean,
		arg.Nome,
		arg.Descricao,
		arg.Marca,
		arg.CategoriaID,
		arg.Ncm,
		arg.Unidade,
		arg.PesoKg,
		arg.VolumeMl,
		arg.Embalagem,
		arg.MultiploVenda,
		arg.Perecivel,
		arg.ControlaLote,
		arg.Ativo,
	)
	var i Produto
	err := row.Scan(
		&i.ID,
		&i.Ean,
		&i.Nome,
		&i.Descricao,
		&i.Marca,
		&i.CategoriaID,
		&i.Ncm,
		&i.Unidade,
		&i.PesoKg,
		&i.VolumeMl,
		&i.Embalagem,
		&i.MultiploVenda,
		&i.Perecivel,
		&i.ControlaLote,
		&i.Ativo,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
