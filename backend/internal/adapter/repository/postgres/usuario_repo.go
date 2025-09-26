package postgres

import (
	"context"

	"github.com/jbavalente/estoque/internal/domain/entity"
	"github.com/jbavalente/estoque/internal/infra/db"
)

// UsuarioRepositoryPG is a PostgreSQL implementation of the UsuarioRepository.
type UsuarioRepositoryPG struct {
	queries *db.Queries
}

// NewUsuarioRepositoryPG creates a new UsuarioRepositoryPG.
func NewUsuarioRepositoryPG(queries *db.Queries) *UsuarioRepositoryPG {
	return &UsuarioRepositoryPG{queries: queries}
}

// FindByEmail finds a user by email.
func (r *UsuarioRepositoryPG) FindByEmail(ctx context.Context, email string) (*entity.Usuario, error) {
	dbUser, err := r.queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	return toUsuarioEntity(dbUser), nil
}

func toUsuarioEntity(dbUser db.Usuario) *entity.Usuario {
	return &entity.Usuario{
		ID:        dbUser.ID,
		Nome:      dbUser.Nome,
		Email:     dbUser.Email,
		SenhaHash: dbUser.SenhaHash,
		Perfil:    dbUser.Perfil,
		LojaID:    dbUser.LojaID.Bytes,
		Ativo:     dbUser.Ativo.Bool,
		UltimoLogin: dbUser.UltimoLogin.Time,
		CreatedAt: dbUser.CreatedAt.Time,
		UpdatedAt: dbUser.UpdatedAt.Time,
	}
}
