package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

// TokenManager provides methods for creating and validating JWTs.
type TokenManager struct {
	secretKey      string
	accessTokenTTL time.Duration
}

// NewTokenManager creates a new TokenManager.
func NewTokenManager(secretKey string, accessTokenTTL time.Duration) *TokenManager {
	return &TokenManager{secretKey: secretKey, accessTokenTTL: accessTokenTTL}
}

// CreateToken creates a new JWT for a specific user.
func (tm *TokenManager) CreateToken(userID uuid.UUID, perfil string) (string, error) {
	claims := jwt.MapClaims{
		"sub":    userID,
		"perfil": perfil,
		"exp":    time.Now().Add(tm.accessTokenTTL).Unix(),
		"iat":    time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(tm.secretKey))
	if err != nil {
		return "", fmt.Errorf("failed to sign token: %w", err)
	}

	return tokenString, nil
}

// VerifyToken checks if the token is valid.
func (tm *TokenManager) VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(tm.secretKey), nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	return token, nil
}
