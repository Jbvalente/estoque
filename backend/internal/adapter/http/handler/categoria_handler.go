package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jbavalente/estoque/internal/usecase/produto"
)

// CategoriaHandler handles HTTP requests for categories.
type CategoriaHandler struct {
	listCategoriasUseCase *produto.ListCategoriasUseCase
}

// NewCategoriaHandler creates a new CategoriaHandler.
func NewCategoriaHandler(listUC *produto.ListCategoriasUseCase) *CategoriaHandler {
	return &CategoriaHandler{listCategoriasUseCase: listUC}
}

// List handles the listing of categories.
func (h *CategoriaHandler) List(c *gin.Context) {
	categorias, err := h.listCategoriasUseCase.Execute(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categorias)
}
