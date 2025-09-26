@echo off
REM Script para inicializar a aplicação de controle de estoque
REM Sistema: Windows
REM Autor: João Valente

echo ===============================================
echo  Sistema de Controle de Estoque - Supermercado
echo ===============================================
echo.

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Docker não encontrado. Instale o Docker Desktop primeiro.
    echo Download: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Verificar se Docker Compose está disponível
docker compose version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Docker Compose não encontrado. Certifique-se que o Docker Desktop está atualizado.
    pause
    exit /b 1
)

echo [INFO] Docker encontrado. Verificando serviços...

REM Navegar para o diretório do projeto
cd /d "%~dp0.."

REM Verificar se o arquivo docker-compose.yml existe
if not exist "deployments\docker-compose.yml" (
    echo [ERRO] Arquivo deployments\docker-compose.yml não encontrado.
    echo Certifique-se de estar no diretório correto do projeto.
    pause
    exit /b 1
)

echo [INFO] Parando serviços existentes...
docker compose -f deployments/docker-compose.yml down

echo [INFO] Construindo e iniciando serviços...
docker compose -f deployments/docker-compose.yml up --build -d

if %errorlevel% neq 0 (
    echo [ERRO] Falha ao iniciar os serviços. Verifique os logs:
    echo   docker compose -f deployments/docker-compose.yml logs
    pause
    exit /b 1
)

echo.
echo [SUCESSO] Aplicação iniciada com sucesso!
echo.
echo Serviços disponíveis:
echo   Frontend: http://localhost:3001
echo   Backend:  http://localhost:8080
echo.
echo Credenciais padrão:
echo   Email: admin@supermercado.com
echo   Senha: password
echo.
echo Para parar a aplicação, execute:
echo   scripts\stop-app.bat
echo.
echo Para ver logs:
echo   docker compose -f deployments/docker-compose.yml logs -f
echo.

REM Verificar status dos serviços
echo [INFO] Status dos serviços:
docker compose -f deployments/docker-compose.yml ps

echo.
echo Pressione qualquer tecla para abrir o frontend no navegador...
pause >nul

REM Abrir o frontend no navegador padrão
start http://localhost:3001

echo.
echo Aplicação em execução. Pressione qualquer tecla para sair.
pause >nul
