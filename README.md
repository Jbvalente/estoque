# Sistema de Controle de Estoque para Supermercado

Sistema completo de controle de estoque com FEFO, alertas de validade, margens de lucro, inventário e KPIs, desenvolvido com **Go** (backend) e **Next.js** (frontend).

## 🚀 Início Rápido

### Pré-requisitos
- **Docker Desktop** instalado e em execução
- **Git** (para clonar o repositório)

### Método 1: Scripts Automatizados (Recomendado)

**Windows:**
```bash
scripts\start-app.bat
```

**Linux/macOS:**
```bash
chmod +x scripts/start-app.sh
scripts/start-app.sh
```

Os scripts fazem tudo automaticamente:
- ✅ Verificam pré-requisitos
- ✅ Param/limpam serviços existentes  
- ✅ Constroem e sobem todos os containers
- ✅ Mostram status e abrem o navegador

### Método 2: Comandos Manuais

```bash
# Construir e subir todos os serviços
docker compose -f deployments/docker-compose.yml up --build -d

# Ver status dos serviços
docker compose -f deployments/docker-compose.yml ps

# Ver logs (se necessário)
docker compose -f deployments/docker-compose.yml logs -f
```

### 🌐 Acessos

Após a inicialização:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Banco PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### 🔐 Login Padrão

- **Email**: `admin@supermercado.com`
- **Senha**: `password`

## 🛑 Como Parar

**Windows:**
```bash
scripts\stop-app.bat
```

**Linux/macOS:**
```bash
scripts/stop-app.sh
```

**Manual:**
```bash
docker compose -f deployments/docker-compose.yml down
```

## 📁 Estrutura do Projeto

```
├── backend/           # API Go (Clean Architecture)
├── frontend/          # Next.js 14+ (App Router)
├── deployments/       # Docker Compose
├── scripts/           # Scripts de automação
├── contexto/          # Documentação de negócio
└── docs/              # Documentação técnica
```

## 🎯 Funcionalidades Implementadas

- ✅ **Autenticação**: Login com JWT
- ✅ **Produtos**: CRUD completo com categorias
- ✅ **Estoque**: Saldos por lote/local, FEFO
- ✅ **Validade**: Alertas ≤30 dias
- ✅ **Vendas**: Ranking e margens
- ✅ **Inventário**: Coleta e conciliação
- ✅ **Dashboard**: KPIs e alertas

## 🔧 Desenvolvimento

Para desenvolvimento local:

```bash
# Backend
cd backend
go mod tidy
go run cmd/api/main.go

# Frontend  
cd frontend
pnpm install
pnpm dev
```
