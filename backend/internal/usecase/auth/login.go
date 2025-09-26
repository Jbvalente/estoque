package auth

import (
	"context"
	"errors"

	"github.com/jbavalente/estoque/internal/domain/repository"
	"github.com/jbavalente/estoque/internal/infra/auth"
)

// LoginUseCase is the use case for user login.
type LoginUseCase struct {
	userRepo     repository.UsuarioRepository
	tokenManager *auth.TokenManager
}

// NewLoginUseCase creates a new LoginUseCase.
func NewLoginUseCase(userRepo repository.UsuarioRepository, tokenManager *auth.TokenManager) *LoginUseCase {
	return &LoginUseCase{userRepo: userRepo, tokenManager: tokenManager}
}

// Execute executes the use case.
func (uc *LoginUseCase) Execute(ctx context.Context, input LoginInputDTO) (LoginOutputDTO, error) {
	user, err := uc.userRepo.FindByEmail(ctx, input.Email)
	if err != nil {
		return LoginOutputDTO{}, errors.New("invalid email or password")
	}

	if !auth.CheckPasswordHash(input.Password, user.SenhaHash) {
		return LoginOutputDTO{}, errors.New("invalid email or password")
	}

	accessToken, err := uc.tokenManager.CreateToken(user.ID, user.Perfil)
	if err != nil {
		return LoginOutputDTO{}, errors.New("failed to create access token")
	}

	return LoginOutputDTO{AccessToken: accessToken}, nil
}

// LoginInputDTO is the input data transfer object for login.
type LoginInputDTO struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// LoginOutputDTO is the output data transfer object for login.
type LoginOutputDTO struct {
	AccessToken string `json:"access_token"`
}
