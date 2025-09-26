package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jbavalente/estoque/internal/usecase/produto"
)

// ProdutoHandler handles HTTP requests for products.
type ProdutoHandler struct {
	createProdutoUseCase *produto.CreateProdutoUseCase
	listProdutosUseCase  *produto.ListProdutosUseCase
	getProdutoUseCase    *produto.GetProdutoUseCase
}

// NewProdutoHandler creates a new ProdutoHandler.
func NewProdutoHandler(createUC *produto.CreateProdutoUseCase, listUC *produto.ListProdutosUseCase, getUC *produto.GetProdutoUseCase) *ProdutoHandler {
	return &ProdutoHandler{
		createProdutoUseCase: createUC,
		listProdutosUseCase:  listUC,
		getProdutoUseCase:    getUC,
	}
}

// Create handles the creation of a new product.
func (h *ProdutoHandler) Create(c *gin.Context) {
	var input produto.CreateProdutoInputDTO
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Add validation using go-playground/validator

	if err := h.createProdutoUseCase.Execute(c.Request.Context(), input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// List handles the listing of products.
func (h *ProdutoHandler) List(c *gin.Context) {
	var input produto.ListProdutosInputDTO
	if err := c.ShouldBindQuery(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	produtos, err := h.listProdutosUseCase.Execute(c.Request.Context(), input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, produtos)
}

// Get handles getting a product by ID.
func (h *ProdutoHandler) Get(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product ID"})
		return
	}

	produto, err := h.getProdutoUseCase.Execute(c.Request.Context(), id)
	if err != nil {
		// TODO: Handle not found error specifically
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, produto)
}
