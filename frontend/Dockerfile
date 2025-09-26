# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Enable corepack and pin pnpm version (keep in sync with local)
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies (respect lockfile)
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Ensure same pnpm version in builder stage
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 3: Production server
FROM node:20-alpine AS runner

WORKDIR /app

# Ensure pnpm available at runtime (for start script)
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

ENV NODE_ENV=production

# Copy from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# The default command to start the app. 
# We will override this with `pnpm dev` in docker-compose for the development environment.
CMD ["pnpm", "start", "--", "-H", "0.0.0.0", "-p", "3000"]

