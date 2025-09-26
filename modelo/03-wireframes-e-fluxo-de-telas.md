# Wireframes e Fluxo de Telas (Descrição Textual)

**Autor:** João Valente  
**Analista Sênior:** Assistente IA  
**Status:** Em definição

---

## 1. Objetivo

Este documento descreve a estrutura visual e o fluxo de navegação do **Painel de Controle WhatsApp**. Ele serve como um wireframe de baixa fidelidade em formato de texto, guiando a implementação dos componentes de UI e a experiência do usuário.

---

## 2. Telas Principais

### Tela 1: Login (`/login`)

-   **Layout:** Centralizado na tela, com um card para o formulário.
-   **Componentes:**
    -   **Título Principal (h1):** "Painel de Controle - WhatsApp"
    -   **Card (shadcn/ui Card):**
        -   **Card.Header:**
            -   **Card.Title:** "Acessar o Painel"
            -   **Card.Description:** "Utilize suas credenciais para entrar."
        -   **Card.Content:**
            -   **Label:** "Usuário"
            -   **Input (shadcn/ui Input):** `type="text"`, `placeholder="seu.usuario"`
            -   **Label:** "Senha"
            -   **Input (shadcn/ui Input):** `type="password"`
        -   **Card.Footer:**
            -   **Button (shadcn/ui Button):** "Entrar", largura total.
-   **Fluxo de Interação:**
    1.  Usuário preenche os campos.
    2.  Ao clicar em "Entrar", a aplicação envia os dados para `POST /api/v1/auth/login`.
    3.  Se sucesso (200 OK), o usuário é redirecionado para a rota `/` (Dashboard).
    4.  Se erro (401 Unauthorized), uma notificação (toast) de "Credenciais inválidas" é exibida.

---

### Tela 2: Vinculação de Dispositivo (Página Dedicada: `/link-device`)

-   **Contexto:** Esta página é acessada através de um link/botão no painel principal, apenas quando o sistema detecta que nenhum dispositivo está conectado.
-   **Layout:** Centralizado, focado, e sem distrações.
-   **Componentes:**
    -   **Título Principal (h1):** "Vincular Novo Dispositivo"
    -   **Card (shadcn/ui Card):**
        -   **Card.Header:**
            -   **Card.Title:** "Escaneie para Conectar"
            -   **Card.Description:** "Abra o WhatsApp no seu celular, vá em 'Aparelhos conectados' e aponte a câmera para o código abaixo."
        -   **Card.Content (Conteúdo Condicional):**
            -   **Estado 1: Carregando:** Um componente **Spinner (shadcn/ui)** com o texto "Aguardando QR Code...".
            -   **Estado 2: Exibindo QR Code:** O componente **`QrCodeLinker.tsx`** renderiza o QR Code.
            -   **Estado 3: Sucesso:** Um ícone de **CheckCircle** com o texto "Conectado com sucesso! Redirecionando...".
-   **Fluxo de Interação Simplificado:**
    1.  O usuário clica no botão "Vincular Dispositivo" no painel e navega para esta página.
    2.  A página imediatamente tenta se conectar ao WebSocket para obter o QR Code.
    3.  **Estado 1** é exibido. Ao receber o código, a UI muda para o **Estado 2**.
    4.  Após o usuário escanear e o login for bem-sucedido (evento `loginSuccess`), a UI muda para o **Estado 3** e, em seguida, redireciona o usuário de volta para a rota `/` (Painel Principal).
    5.  Se ocorrer um erro, uma notificação (toast) é exibida na própria página.

---

### Tela 3: Layout Principal do Dashboard (`/layout.tsx` do grupo de rotas `(dashboard)`)

-   **Layout:** Estrutura de duas colunas (Sidebar + Conteúdo Principal).
-   **Fluxo Simplificado:** Este layout **não conterá mais lógica condicional** para verificar a conexão. Sua única responsabilidade é renderizar a `Sidebar` e a área de conteúdo (`children`), garantindo que o painel seja sempre acessível após o login.
-   **Componentes:**
    -   **Coluna Esquerda (Sidebar):**
        -   **Logo/Título:** "Painel WA"
        -   **Nav (shadcn/ui Nav):**
            -   Link para "Dashboard" (`/`)
            -   Link para "Contatos" (`/contacts`)
            -   Link para "Relatórios Mensais" (`/monthly-reports`)
        -   **Seção Fixa no Fim (Lógica Condicional):**
            -   **Se Conectado:** Renderiza um botão **"Desconectar Dispositivo"** que aciona a Server Action `handleReset`.
            -   **Se Desconectado:** Renderiza um link **"Vincular Dispositivo"** que navega para a página dedicada `/link-device`.
    -   **Coluna Direita (Conteúdo Principal):**
        -   **Header:**
            -   **Componente de Status da Conexão (Novo):** Um banner ou "badge" no topo exibirá de forma clara o status "Conectado" (verde) ou "Desconectado" (vermelho).
            -   **Breadcrumbs (shadcn/ui Breadcrumb):** Exibe a navegação atual (ex: "Home / Contatos / Detalhes").
            -   **Dropdown do Usuário (shadcn/ui DropdownMenu):**
                -   Exibe o nome do usuário (ex: "João Valente").
                -   Opção "Sair" que limpa o token e redireciona para `/login`.
        -   **Área de Conteúdo:** O `children` do layout, onde a página principal do painel (`page.tsx`) será renderizada.

---

### Tela 4: Painel Principal (`/page.tsx` do dashboard)
-   **Layout:** Ocupa a área de conteúdo do Layout Principal.
-   **Fluxo Simplificado:** A página não precisa mais se preocupar em renderizar o QR Code. Sua única responsabilidade é buscar os dados do painel.
-   **Componentes:**
    -   **Se Conectado:** Exibe os cards de estatísticas (Total de Contatos, Mensagens Hoje, etc.).
    -   **Se Desconectado:** Exibe uma mensagem amigável: "Nenhum dispositivo conectado. Por favor, clique em 'Vincular Dispositivo' na barra lateral para começar."

---

### Tela 5: Lista de Contatos (`/contacts`)

-   **Layout:** Ocupa a área de conteúdo do Layout Principal.
-   **Componentes:**
    -   **Título da Página (h2):** "Contatos"
    -   **Área de Ações (acima da tabela):**
        -   **Input de Busca (shadcn/ui Input):** Com um ícone de lupa, para pesquisar contatos.
    -   **Tabela de Dados (`ContactDataTable.tsx`):**
        -   **Colunas:** "Nome", "ID do Contato", "Nº de Relatórios", "Última Interação".
        -   **Ações por Linha:** Um botão "Ver Detalhes" que navega para `/contacts/{contactId}`.
        -   **Paginação (shadcn/ui Pagination):** No rodapé da tabela.
-   **Fluxo de Interação:**
    1.  A página busca os dados de `GET /api/v1/contacts`.
    2.  A tabela é renderizada com os dados da primeira página.
    3.  A busca no input dispara uma nova requisição à API com o parâmetro `search`.
    4.  Clicar nos controles de paginação busca os dados da página correspondente. 

---

    5.  Clicar no botão "Baixar" em um anexo inicia o download do arquivo correspondente.

---

## 3. Identidade Visual e Paleta de Cores

Para garantir uma interface limpa, profissional e com excelente legibilidade, o projeto adotará a paleta de cores "Profissional & Focado", inspirada no tema Zinco da biblioteca shadcn/ui.

-   **Fundo Principal:** `Zinc 50` (Branco levemente acinzentado).
-   **Fundo de Cards/Conteúdo:** `Branco` ou `Zinc 100`.
-   **Texto Principal:** `Zinc 900` (Preto suave).
-   **Texto Secundário (Muted):** `Zinc 500` (Cinza médio).
-   **Cor de Acento Primário (Botões, Links):** `Azul 600` (Azul clássico e acessível).
-   **Cores de Status:**
    -   **Sucesso / Online:** `Verde 500`.
    -   **Aviso / Pendente:** `Amarelo 500`.
    -   **Erro / Falha:** `Vermelho 500`. 
### Tela 5: Detalhes do Contato (`/contacts/[contactId]`)

-   **Propósito:** Esta tela funciona como um "hub" para um contato específico, fornecendo uma visão geral antes de mergulhar em um relatório.
-   **Layout:** Uma série de cards com informações e uma lista de relatórios.
-   **Componentes:**
    -   **Cabeçalho da Página:**
        -   **Título (h2):** Nome do Contato (ex: "Maria Silva").
        -   **Botões de Ação:** "Enviar Mensagem", "Gerar Novo Relatório".
    -   **Grid de Cards (2 colunas):**
        -   **Card 1: Informações do Contato:** Exibe dados como telefone, email e status.
        -   **Card 2: Estatísticas:** Exibe dados como "Total de Mensagens" e "Nº de Relatórios".
    -   **Card de Lista de Relatórios:**
        -   **Título:** "Relatórios Recentes".
        -   **Conteúdo:** Uma lista de relatórios, onde cada item mostra o título/data do relatório e um botão "Ver Relatório".
-   **Fluxo de Interação:**
    1.  A página busca os dados de `GET /api/v1/contacts/{contactId}`.
    2.  Clicar em "Ver Relatório" navega o usuário para a tela **Visualizador de Relatório** (`/contacts/{contactId}/reports/{reportId}`).

---

### Tela 6: Visualizador de Relatório (`/contacts/[contactId]/reports/[reportId]`)

-   **Layout:** Ocupa a área de conteúdo do Layout Principal. É composto por um cabeçalho de página e um sistema de abas.
-   **Componentes:**
    -   **Cabeçalho da Página:**
        -   **Título (h2):** "Relatório de Contato"
        -   **Subtítulo (p):** "Exibindo análise para **{Nome do Contato}** do dia **{Data do Relatório}**"
    -   **Sistema de Abas (shadcn/ui Tabs):**
        -   **Tabs.List (Navegação das abas):**
            -   **Tabs.Trigger:** "Análise"
            -   **Tabs.Trigger:** "Histórico da Conversa"
            -   **Tabs.Trigger:** "Anexos"
        -   **Tabs.Content (Conteúdo da Aba "Análise"):**
            -   **Card (shadcn/ui Card):**
                -   **Card.Header:** "Resumo da Análise de IA"
                -   **Card.Content:** Um bloco de texto pré-formatado (`<pre>`) exibindo o conteúdo do `analise.txt`.
        -   **Tabs.Content (Conteúdo da Aba "Histórico da Conversa"):**
            -   Uma área de scroll vertical que contém o componente `ChatHistory.tsx`.
            -   O componente renderiza as mensagens em balões de chat, diferenciando "enviadas" e "recebidas". Cada balão mostra a mensagem e o timestamp.
        -   **Tabs.Content (Conteúdo da Aba "Anexos"):**
            -   **Tabela (shadcn/ui Table):**
                -   **Colunas:** "Ícone do Arquivo", "Nome do Arquivo", "Tamanho", "Ação".
                -   Cada linha representa um anexo.
                -   A coluna "Ação" contém um **Button (shadcn/ui Button)** com o texto "Baixar" e um ícone de download, que aciona o download do arquivo.
-   **Fluxo de Interação:**
    1.  A página é carregada e busca os dados do relatório de `GET /api/v1/contacts/{contactId}/reports/{reportId}`.
    2.  Enquanto carrega, componentes **Skeleton (shadcn/ui Skeleton)** são exibidos no lugar do conteúdo.
    3.  Após o carregamento, os dados populam o cabeçalho e o conteúdo de todas as abas.
    4.  O usuário pode alternar entre as abas para ver as diferentes seções do relatório.