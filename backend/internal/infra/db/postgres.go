package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewPostgresConnection creates a new PostgreSQL connection pool.
func NewPostgresConnection(dataSourceName string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(context.Background(), dataSourceName)
	if err != nil {
		return nil, fmt.Errorf("unable to create connection pool: %w", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		pool.Close()
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	return pool, nil
}
