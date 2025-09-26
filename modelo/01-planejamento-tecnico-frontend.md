# Plano Técnico Detalhado - Frontend do Painel de Controle

**Autor:** João Valente  
**Analista Sênior:** Assistente IA  
**Status:** Em definição

---

## 1. Visão Geral da Arquitetura

-   **Framework:** Next.js 14+ (com App Router)
-   **Linguagem:** TypeScript
-   **Estilo:** Tailwind CSS
-   **Componentes UI:** Shadcn UI
-   **Busca de Dados e Cache:** TanStack Query (React Query)
-   **Gerenciamento de Estado Global:** Zustand (para estado mínimo, como dados de autenticação)
-   **Validação de Schema:** Zod

## 2. Design da API (Contrato Backend-Frontend)

Esta seção define os endpoints que o `whatsapp-mcp-server` (backend em Python) precisará expor para que o frontend funcione.

### 2.1. Autenticação

-   **Endpoint:** `POST /api/v1/auth/login`
-   **Request Body:** `{ "username": "...", "password": "..." }`
-   **Resposta (Sucesso):** `{ "token": "jwt.token.aqui" }`
-   **Resposta (Erro):** `401 Unauthorized`

-   **Endpoint (Novo):** `GET /api/v1/auth/qr-code`
-   **Descrição:** Inicia uma conexão para obter o QR Code de vinculação do WhatsApp. Idealmente, esta comunicação deve ser feita via **WebSocket** ou **Server-Sent Events (SSE)** para notificar o frontend em tempo real.
-   **Fluxo de Eventos (via WebSocket/SSE):**
    1.  Frontend conecta.
    2.  Backend envia `{"event": "qrCode", "data": "STRING_DO_QR_CODE"}`.
    3.  Frontend renderiza o QR Code.
    4.  Após o scan, backend envia `{"event": "success", "data": "Login bem-sucedido!"}`.
    5.  Frontend redireciona para o dashboard.
-   **Alternativa (HTTP Polling):** Se WebSocket não for viável, um endpoint `GET` que retorna a string do QR ou um status de "conectado". (Menos eficiente, não recomendado).

### 2.2. Reset Coordenado da Ponte

-   **Endpoint:** `POST /api/v1/device/reset-coordenado`
-   **Descrição:** Dispara, via backend, o script de reset coordenado (encerra e reinicia a ponte Go e abre a rota `/link-device`). O endpoint retorna imediatamente informando que o processo foi iniciado.
-   **Fluxo de UI:** Após o 200, o frontend exibe a tela "Aguardando Reinicialização da Ponte" e inicia polling em `/api/v1/status`. Quando a ponte voltar, redireciona para `/link-device` para renderizar o QR.

### 2.3. Status

-   **Endpoint:** `GET /api/v1/status`
-   **Descrição:** Verifica se a ponte Go está conectada. Usado pelo `ConnectionGuard` para proteger rotas e para o polling pós-reset.

### 2.4. Contatos

-   **Endpoint:** `GET /api/v1/contacts`
-   **Query Params:**
    -   `search` (string, opcional): Filtra contatos por nome ou ID.
    -   `page` (number, opcional, default=1): Para paginação.
    -   `limit` (number, opcional, default=20): Itens por página.
-   **Resposta:**
    ```typescript
    // Schema Zod
    const PaginatedContactsResponse = z.object({
      data: z.array(z.object({
        contactId: z.string(),
        name: z.string(),
        lastReportDate: z.string().datetime(),
        reportCount: z.number(),
      })),
      pagination: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    });
    ```

-   **Endpoint (Novo):** `GET /api/v1/contacts/{contactId}`
-   **Descrição:** Retorna os detalhes e estatísticas de um contato específico, além de uma lista de seus relatórios recentes.
-   **Resposta (Schema Zod):**
    ```typescript
    const ContactDetailsResponse = z.object({
      id: z.string(),
      name: z.string(),
      contactId: z.string(), // O número de telefone
      email: z.string().optional(),
      status: z.string(),
      createdAt: z.string().datetime(),
      lastInteraction: z.string().datetime(),
      reportCount: z.number(),
      totalMessages: z.number(),
      recentReports: z.array(z.object({
        id: z.string(),
        title: z.string(),
        date: z.string().datetime(),
        status: z.string(),
      })),
    });
    ```

### 2.5. Relatórios

-   **Endpoint:** `GET /api/v1/contacts/{contactId}/reports` (Este endpoint pode não ser mais necessário se a lista vier sempre junto com os detalhes do contato)
-   **Resposta:**
    ```typescript
    // Schema Zod
    const ReportsListResponse = z.array(z.object({
      reportId: z.string(),
      createdAt: z.string().datetime(),
      attachmentCount: z.number(),
    }));
    ```

-   **Endpoint:** `GET /api/v1/contacts/{contactId}/reports/{reportId}`
-   **Resposta:**
    ```typescript
    // Schema Zod
    const ReportDetailSchema = z.object({
      reportId: z.string(),
      contactId: z.string(),
      analysis: z.string(), // Conteúdo do analise.txt
      history: z.array(z.object({
        author: z.string(), // ex: "me" | "contact"
        timestamp: z.string().datetime(),
        message: z.string(),
      })),
      attachments: z.array(z.object({
        fileName: z.string(),
        url: z.string(), // URL para download direto
        sizeBytes: z.number(),
      })),
    });
    ```

### 2.6. Anexos

-   **Endpoint:** `GET /api/v1/contacts/{contactId}/reports/{reportId}/attachments/{fileName}`
-   **Ação:** Deve retornar o arquivo para download com os headers `Content-Disposition: attachment`.

---

## 3. Design do Frontend

### 3.1. Estrutura de Diretórios e Rotas
```
/app
├── (auth)/
│   └── login/
│       └── page.tsx      // Rota: /login
├── (dashboard)/
│   ├── layout.tsx        // Layout com sidebar e header para rotas protegidas
│   ├── page.tsx          // Rota: / (Dashboard principal)
│   ├── contacts/
│   │   ├── page.tsx      // Rota: /contacts (Lista de contatos)
│   │   └── [contactId]/
│   │       ├── page.tsx  // Rota: /contacts/{id} (NOVO: Detalhes do Contato/Hub)
│   │       └── reports/
│   │           └── [reportId]/
│   │               └── page.tsx // Rota: /contacts/{id}/reports/{id} (Visualizador)
│   ├── link-device/
│   │   └── page.tsx      // Rota: /link-device (Exibição do QR Code)
│   └── monthly-reports/
│       └── page.tsx      // Rota: /monthly-reports
└── layout.tsx
```

### 3.2. Decomposição de Componentes

-   **`@/components/auth/LoginForm.tsx`**: Formulário de login com validação.
-   **`@/components/auth/QrCodeLinker.tsx`**: Componente para gerenciar a conexão WebSocket/SSE, receber a string do QR code e renderizá-lo na tela.
-   **`@/components/layout/Sidebar.tsx`**: Barra de navegação lateral.
-   **`@/components/layout/Header.tsx`**: Cabeçalho com informações do usuário e botão de logout.
-   **`@/components/contacts/ContactDataTable.tsx`**: Tabela de contatos reutilizável com busca, ordenação e paginação.
-   **`@/components/reports/ReportViewer.tsx`**: Componente principal que organiza a visualização de um relatório.
    -   **`@/components/reports/AnalysisPanel.tsx`**: Painel para exibir o texto da análise.
    -   **`@/components/reports/ChatHistory.tsx`**: Componente que renderiza o histórico da conversa.
    -   **`@/components/reports/AttachmentList.tsx`**: Lista os anexos para download.

### 3.3. Plano de Testes
-   **Unitários (Vitest):** Funções utilitárias (formatação de datas, tamanhos de arquivo), hooks customizados.
-   **Integração (React Testing Library):** Renderização de componentes com dados mockados, interação do usuário com formulários e tabelas.
-   **E2E (Playwright):** Fluxo completo de login, navegação entre páginas, busca e visualização de um relatório.

---

## 4. Próximos Passos
1.  Validar e refinar os schemas da API com a equipe de backend.
2.  Desenvolver os wireframes de baixa fidelidade para as telas principais no Figma.
3.  Iniciar a configuração do projeto Next.js (Fase 1 de desenvolvimento). 