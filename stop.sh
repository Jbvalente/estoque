#!/bin/bash
# Script para parar a aplicação de controle de estoque
# Sistema: Unix/Linux/macOS
# Autor: João Valente

set -e

echo "==============================================="
echo " Parando Sistema de Controle de Estoque"
echo "==============================================="
echo

# Já estamos na raiz do projeto
cd "$(dirname "$0")"

echo "[INFO] Parando todos os serviços..."
docker compose -f deployments/docker-compose.yml down

if [[ $? -ne 0 ]]; then
    echo "[ERRO] Falha ao parar os serviços."
    exit 1
fi

echo
echo "[SUCESSO] Todos os serviços foram parados."
echo
echo "Para remover volumes e dados (CUIDADO - apaga dados do banco):"
echo "  docker compose -f deployments/docker-compose.yml down -v"
echo
echo "Para iniciar novamente:"
echo "  ./start.sh"
echo


