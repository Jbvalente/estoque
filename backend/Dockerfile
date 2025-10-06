# Stage 1: Build the Go application
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache build-base

# Install golang-migrate
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Copy go.mod and go.sum to download dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application
# -o /app/main specifies the output file name
# CGO_ENABLED=0 is important for creating a static binary that can run in a minimal container
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd/api

# Stage 2: Create the final lightweight container
FROM alpine:latest

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/main ./main

# Copy the migration files
COPY --from=builder /go/bin/migrate /usr/local/bin/
COPY ./migrations ./migrations

# Expose the port the app runs on
EXPOSE 8080

# This is the command that will be run when the container starts
# It will first run the migrations and then start the application
# Note: A proper solution would use a separate script or init container for migrations in production
CMD ["sh", "-c", "migrate -path /app/migrations -database \"$DB_SOURCE\" up || true; ./main"]
