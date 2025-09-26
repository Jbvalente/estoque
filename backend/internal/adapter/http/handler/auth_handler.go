package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jbavalente/estoque/internal/usecase/auth"
)

// AuthHandler handles HTTP requests for authentication.
type AuthHandler struct {
	loginUseCase *auth.LoginUseCase
}

// NewAuthHandler creates a new AuthHandler.
func NewAuthHandler(loginUseCase *auth.LoginUseCase) *AuthHandler {
	return &AuthHandler{loginUseCase: loginUseCase}
}

// Login handles user login.
func (h *AuthHandler) Login(c *gin.Context) {
	var input auth.LoginInputDTO
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	output, err := h.loginUseCase.Execute(c.Request.Context(), input)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, output)
}
