@echo off
REM Script para parar a aplicação de controle de estoque
REM Sistema: Windows
REM Autor: João Valente

echo ===============================================
echo  Parando Sistema de Controle de Estoque
echo ===============================================
echo.

REM Já estamos na raiz do projeto
cd /d "%~dp0"

echo [INFO] Parando todos os serviços...
docker compose -f deployments/docker-compose.yml down

if %errorlevel% neq 0 (
    echo [ERRO] Falha ao parar os serviços.
    pause
    exit /b 1
)

echo.
echo [SUCESSO] Todos os serviços foram parados.
echo.
echo Para remover volumes e dados (CUIDADO - apaga dados do banco):
echo   docker compose -f deployments/docker-compose.yml down -v
echo.
echo Para iniciar novamente:
echo   start.bat
echo.

pause
