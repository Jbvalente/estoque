package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jbavalente/estoque/internal/adapter/http/handler"
)

// Router holds the gin engine and manages API routes.
type Router struct {
	engine           *gin.Engine
	produtoHandler   *handler.ProdutoHandler
	authHandler      *handler.AuthHandler
	categoriaHandler *handler.CategoriaHandler
}

// NewRouter creates a new Router.
func NewRouter(engine *gin.Engine, produtoHandler *handler.ProdutoHandler, authHandler *handler.AuthHandler, categoriaHandler *handler.CategoriaHandler) *Router {
	return &Router{
		engine:           engine,
		produtoHandler:   produtoHandler,
		authHandler:      authHandler,
		categoriaHandler: categoriaHandler,
	}
}

// Setup configures the API routes.
func (r *Router) Setup() {
	// Health check endpoint
	r.engine.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// API v1 group
	apiV1 := r.engine.Group("/api/v1")
	{
		auth := apiV1.Group("/auth")
		{
			auth.POST("/login", r.authHandler.Login)
		}

		// TODO: Add authentication middleware

		produtos := apiV1.Group("/produtos")
		{
			produtos.POST("/", r.produtoHandler.Create)
			produtos.GET("/", r.produtoHandler.List)
			produtos.GET("/:id", r.produtoHandler.Get)
			// TODO: Add PUT and DELETE routes
		}

		categorias := apiV1.Group("/categorias")
		{
			categorias.GET("/", r.categoriaHandler.List)
		}
	}
}
