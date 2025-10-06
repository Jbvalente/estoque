package main

import (
	"log"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
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

	// Set defaults if not provided
	if cfg.ServerPort == "" {
		cfg.ServerPort = "8080"
	}
	if cfg.LogLevel == "" {
		cfg.LogLevel = "info"
	}
	if cfg.DBSource == "" {
		log.Fatalf("DB_SOURCE environment variable not set")
	}

	log.Printf("Loaded config: DBSource=%s, ServerPort=%s", cfg.DBSource, cfg.ServerPort)

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

	// CORS
	corsCfg := cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	if cfg.CORSOrigins == "*" || cfg.CORSOrigins == "" {
		corsCfg.AllowAllOrigins = true
	} else {
		parts := strings.Split(cfg.CORSOrigins, ",")
		for i := range parts {
			parts[i] = strings.TrimSpace(parts[i])
		}
		corsCfg.AllowOrigins = parts
	}
	engine.Use(cors.New(corsCfg))
	apiRouter := router.NewRouter(engine, produtoHandler, authHandler, categoriaHandler)
	apiRouter.Setup()

	// Start server
	log.Printf("Starting server on port %s", cfg.ServerPort)
	if err := engine.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}
