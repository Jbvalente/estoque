package db

import (
	"context"
)

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, nome, email, senha_hash, perfil, loja_id, ativo, ultimo_login, created_at, updated_at FROM usuarios
WHERE email = $1 LIMIT 1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (Usuario, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i Usuario
	err := row.Scan(
		&i.ID,
		&i.Nome,
		&i.Email,
		&i.SenhaHash,
		&i.Perfil,
		&i.LojaID,
		&i.Ativo,
		&i.UltimoLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
