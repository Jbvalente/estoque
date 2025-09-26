package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jbavalente/estoque/internal/adapter/http/handler"
	"github.com/jbavalente/estoque/internal/adapter/http/router"
	"github.com/jbavalente/estoque/internal/adapter/repository/postgres"
	"github.com/jbavalente/estoque/internal/infra/auth"
	"github.com/jbavalente/estoque/internal/infra/config"
	"github.com/jbavalente/estoque/internal/infra/db"
	uc_auth "github.com/jbavalente/estoque/internal/usecase/auth"
	"github.com/jbavalente/estoque/internal/usecase/produto"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig(".")
	if err != nil {
		log.Fatalf("could not load config: %v", err)
	}

	// Initialize logger (to be implemented)
	// logger := logger.New(cfg.LogLevel)

	// Connect to database
	connPool, err := db.NewPostgresConnection(cfg.DBSource)
	if err != nil {
		log.Fatalf("could not connect to the database: %v", err)
	}
	defer connPool.Close()

	// Create db queries
	dbQueries := db.New(connPool)

	// Setup repositories
	produtoRepo := postgres.NewProdutoRepositoryPG(dbQueries)
	usuarioRepo := postgres.NewUsuarioRepositoryPG(dbQueries)
	categoriaRepo := postgres.NewCategoriaRepositoryPG(dbQueries)

	// Setup auth
	tokenManager := auth.NewTokenManager(cfg.JWTSecret, cfg.JWTAccessTTL)

	// Setup use cases
	createProdutoUC := produto.NewCreateProdutoUseCase(produtoRepo)
	listProdutosUC := produto.NewListProdutosUseCase(produtoRepo)
	getProdutoUC := produto.NewGetProdutoUseCase(produtoRepo)
	listCategoriasUC := produto.NewListCategoriasUseCase(categoriaRepo)
	loginUC := uc_auth.NewLoginUseCase(usuarioRepo, tokenManager)

	// Setup handlers
	produtoHandler := handler.NewProdutoHandler(createProdutoUC, listProdutosUC, getProdutoUC)
	authHandler := handler.NewAuthHandler(loginUC)
	categoriaHandler := handler.NewCategoriaHandler(listCategoriasUC)

	// Setup router
	engine := gin.Default()
	apiRouter := router.NewRouter(engine, produtoHandler, authHandler, categoriaHandler)
	apiRouter.Setup()

	// Start server
	log.Printf("Starting server on port %s", cfg.ServerPort)
	if err := engine.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}
