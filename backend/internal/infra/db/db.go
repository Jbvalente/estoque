package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// DBTX is an interface for database transactions.
type DBTX interface {
	Exec(context.Context, string, ...interface{}) (pgconn.CommandTag, error)
	Query(context.Context, string, ...interface{}) (pgx.Rows, error)
	QueryRow(context.Context, string, ...interface{}) pgx.Row
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

func (q *Queries) WithTx(tx pgx.Tx) *Queries {
	return &Queries{db: tx}
}

type Queries struct {
	db DBTX
}
