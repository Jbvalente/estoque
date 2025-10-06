package config

import (
	"strings"
	"time"

	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	DBSource      string        `mapstructure:"DB_SOURCE"`
	RedisURL      string        `mapstructure:"REDIS_URL"`
	ServerPort    string        `mapstructure:"SERVER_PORT"`
	JWTSecret     string        `mapstructure:"JWT_SECRET"`
	JWTAccessTTL  time.Duration `mapstructure:"JWT_ACCESS_TTL"`
	JWTRefreshTTL time.Duration `mapstructure:"JWT_REFRESH_TTL"`
	LogLevel      string        `mapstructure:"LOG_LEVEL"`
	CORSOrigins   string        `mapstructure:"CORS_ORIGINS"`
}

// LoadConfig reads configuration from file or environment variables.
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app") // you can create an app.env file
	viper.SetConfigType("env")

	// Support environment variables like DB_SOURCE, JWT_SECRET, etc.
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AllowEmptyEnv(true)
	viper.AutomaticEnv()

	// Explicitly bind expected env keys (defensive)
	_ = viper.BindEnv("DB_SOURCE")
	_ = viper.BindEnv("REDIS_URL")
	_ = viper.BindEnv("SERVER_PORT")
	_ = viper.BindEnv("JWT_SECRET")
	_ = viper.BindEnv("JWT_ACCESS_TTL")
	_ = viper.BindEnv("JWT_REFRESH_TTL")
	_ = viper.BindEnv("LOG_LEVEL")
	_ = viper.BindEnv("CORS_ORIGINS")

	err = viper.ReadInConfig()
	if err != nil {
		// If config file is not found, that's okay, we'll use env vars
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return
		}
	}

	err = viper.Unmarshal(&config)
	return
}
