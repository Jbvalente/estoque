package config

import (
	"time"

	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	DBSource         string        `mapstructure:"DB_SOURCE"`
	RedisURL         string        `mapstructure:"REDIS_URL"`
	ServerPort       string        `mapstructure:"SERVER_PORT"`
	JWTSecret        string        `mapstructure:"JWT_SECRET"`
	JWTAccessTTL     time.Duration `mapstructure:"JWT_ACCESS_TTL"`
	JWTRefreshTTL    time.Duration `mapstructure:"JWT_REFRESH_TTL"`
	LogLevel         string        `mapstructure:"LOG_LEVEL"`
	CORSOrigins      string        `mapstructure:"CORS_ORIGINS"`
}

// LoadConfig reads configuration from file or environment variables.
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app") // you can create an app.env file
	viper.SetConfigType("env")

	vip ... (399 more characters)