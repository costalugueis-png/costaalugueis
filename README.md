# Costa Aluguel

## Quick Start

### Pre-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase

### Instalacao

```bash
# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.local.example .env.local
# Editar .env.local com suas credenciais Supabase

# Executar em desenvolvimento
npm run dev
```

Acesse http://localhost:3000

### Credenciais de Demo

- **Admin**: admin@costaalugueis.com / password
- **Tenant**: tenant@example.com / password

### Configuracao Supabase

Veja [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) para instrucoes detalhadas.

## Estrutura do Projeto

```
src/
├── app/
│   ├── (admin)/       # Area administrativa
│   ├── (portal)/      # Portal do usuario
│   ├── login/         # Pagina de login
│   ├── layout.tsx
│   ├── globals.css
├── components/
│   ├── ui/            # Componentes base (shadcn/ui)
│   ├── layout/        # Layouts admin e portal
│   ├── shared/        # Componentes compartilhados
├── lib/
│   ├── supabase-client.ts
│   ├── services/      # Servicos de integracao
│   ├── utils.ts
│   ├── auth-context.ts
├── types/             # TypeScript types
├── mocks/             # Dados mockados
supabase/
├── migrations/        # SQL migrations
```

## Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Deploy**: Vercel
- **Validations**: Zod

## Features

### Admin
- Dashboard com metricas
- CRUD de Imoveis
- CRUD de Contratos
- CRUD de Pagamentos
- Configuracoes do Sistema

### Portal (Tenant)
- Visualizacao de Imovel
- Visualizacao de Contrato
- Historico de Pagamentos
- Download de Documentos
- Perfil e Seguranca

## Seguranca

- RLS ativado em todas as tabelas
- Autenticacao via Supabase Auth
- Guards de rota por perfil
- Validacao de entrada (Zod)

## Deploy na Vercel

```bash
# Push para GitHub
git push origin main

# Configurar variaveis no Vercel
VERCEL_ENV_VAR=valor

# Deploy automatico ao fazer push
```

## Proximas Etapas

- [ ] Conectar Supabase real
- [ ] Implementar Autenticacao Supabase
- [ ] Middleware de Rotas
- [ ] Deploy na Vercel
- [ ] Testes (vitest/jest)
- [ ] Metricas e logs
