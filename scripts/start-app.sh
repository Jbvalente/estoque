#!/bin/bash
# Script para inicializar a aplicação de controle de estoque
# Sistema: Unix/Linux/macOS
# Autor: João Valente

set -e  # Parar em caso de erro

echo "==============================================="
echo " Sistema de Controle de Estoque - Supermercado"
echo "==============================================="
echo

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "[ERRO] Docker não encontrado. Instale o Docker primeiro."
    echo "Download: https://www.docker.com/get-started"
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! docker compose version &> /dev/null; then
    echo "[ERRO] Docker Compose não encontrado. Certifique-se que o Docker está atualizado."
    exit 1
fi

echo "[INFO] Docker encontrado. Verificando serviços..."

# Navegar para o diretório do projeto
cd "$(dirname "$0")/.."

# Verificar se o arquivo docker-compose.yml existe
if [[ ! -f "deployments/docker-compose.yml" ]]; then
    echo "[ERRO] Arquivo deployments/docker-compose.yml não encontrado."
    echo "Certifique-se de estar no diretório correto do projeto."
    exit 1
fi

echo "[INFO] Parando serviços existentes..."
docker compose -f deployments/docker-compose.yml down

echo "[INFO] Construindo e iniciando serviços..."
docker compose -f deployments/docker-compose.yml up --build -d

if [[ $? -ne 0 ]]; then
    echo "[ERRO] Falha ao iniciar os serviços. Verifique os logs:"
    echo "  docker compose -f deployments/docker-compose.yml logs"
    exit 1
fi

echo
echo "[SUCESSO] Aplicação iniciada com sucesso!"
echo
echo "Serviços disponíveis:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8080"
echo
echo "Credenciais padrão:"
echo "  Email: admin@supermercado.com"
echo "  Senha: password"
echo
echo "Para parar a aplicação, execute:"
echo "  scripts/stop-app.sh"
echo
echo "Para ver logs:"
echo "  docker compose -f deployments/docker-compose.yml logs -f"
echo

# Verificar status dos serviços
echo "[INFO] Status dos serviços:"
docker compose -f deployments/docker-compose.yml ps

echo
echo "Aguardando 5 segundos para os serviços inicializarem..."
sleep 5

# Tentar abrir o frontend no navegador (se disponível)
if command -v xdg-open &> /dev/null; then
    echo "[INFO] Abrindo frontend no navegador..."
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    echo "[INFO] Abrindo frontend no navegador..."
    open http://localhost:3000
else
    echo "[INFO] Acesse http://localhost:3000 no seu navegador."
fi

echo
echo "Aplicação em execução. Pressione Ctrl+C para sair."
