# Sistema de Controle de Estoque para Supermercado

Este é o projeto do sistema de controle de estoque, desenvolvido com Go no backend e Next.js no frontend.

## Visão Geral

A aplicação é dividida em duas partes principais:
- `backend/`: Uma API em Go que gerencia toda a lógica de negócio e interação com o banco de dados.
- `frontend/`: Uma aplicação em Next.js que consome a API e fornece a interface para o usuário.

O ambiente de desenvolvimento é orquestrado com Docker Compose, que gerencia os contêineres para o backend, frontend, banco de dados (PostgreSQL) and cache (Redis).

## Como Executar a Aplicação

### Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js e pnpm (para o frontend, se for rodar localmente fora do Docker).

### 1. Iniciar os Serviços do Backend

Navegue até a pasta `deployments` e inicie os contêineres do backend, banco de dados e Redis:

```bash
cd deployments
docker-compose up -d --build backend
```

Este comando irá:
- Construir a imagem Docker para o serviço de backend.
- Iniciar os contêineres para `postgres`, `redis`, e `backend` em modo detached (`-d`).
- O banco de dados será inicializado e as migrações serão aplicadas automaticamente na primeira vez que o backend iniciar.

A API do backend estará disponível em `http://localhost:8080`.

### 2. Iniciar o Frontend

Você pode iniciar o frontend de duas maneiras:

#### a) Usando Docker (Recomendado)

No mesmo diretório `deployments`, execute:

```bash
docker-compose up -d --build frontend
```

#### b) Localmente com pnpm

Se preferir rodar o frontend diretamente na sua máquina:

```bash
cd ../frontend
pnpm install
pnpm dev
```

A aplicação frontend estará disponível em `http://localhost:3000`.

### Acessando a Aplicação

Abra seu navegador e acesse `http://localhost:3000`.

As credenciais de login padrão são:
- **Email**: `admin@supermercado.com`
- **Senha**: `password`

### Parando a Aplicação

Para parar todos os serviços, execute o seguinte comando na pasta `deployments`:

```bash
docker-compose down
```
