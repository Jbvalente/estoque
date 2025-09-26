package db

import (
	"context"
)

const listCategorias = `-- name: ListCategorias :many
SELECT id, nome, descricao, codigo, ativo, created_at, updated_at FROM categorias
WHERE ativo = true
ORDER BY nome
`

func (q *Queries) ListCategorias(ctx context.Context) ([]Categoria, error) {
	rows, err := q.db.Query(ctx, listCategorias)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Categoria
	for rows.Next() {
		var i Categoria
		if err := rows.Scan(
			&i.ID,
			&i.Nome,
			&i.Descricao,
			&i.Codigo,
			&i.Ativo,
			&i.CreatedAt,
			&i.UpdatedAt,
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
