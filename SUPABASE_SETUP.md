# Costa Aluguel - Configuracao Supabase

## 1. Variaveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local`:

```bash
cp .env.local.example .env.local
```

Preencha com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anonima
- `SUPABASE_SERVICE_ROLE_KEY`: Chave de servico (servidor apenas)

## 2. Executar Migrations

Todas as migracoes estao em `supabase/migrations/`:

1. Abra seu projeto Supabase no dashboard
2. Va para SQL Editor
3. Execute os scripts em ordem:
   - `001_initial_schema.sql` - Cria tabelas
   - `002_rls_policies.sql` - Ativa RLS e cria politicas

## 3. Estrutura das Tabelas

### profiles
- Vinculada a `auth.users`
- Armazena informacoes de perfil do usuario
- Roles: admin, manager, tenant, owner

### properties
- Imoveis cadastrados
- Vinculada a `profiles` (owner, tenant)

### contracts
- Contratos de aluguel
- Vinculada a properties e profiles

### payment_installments
- Parcelas de pagamento
- Vinculada a contracts

### documents
- Documentos (contrato, faturas, etc)
- Vinculada a contracts

### site_settings
- Configuracoes do sistema
- Editadas na pagina de Configuracoes do Admin

## 4. Row Level Security (RLS)

Todas as tabelas tem RLS ativado:

- **Tenants**: Veem apenas seus proprios dados
- **Owners**: Veem seus imoveis e contratos
- **Managers**: Veem dados conforme escopo
- **Admins**: Acesso total

## 5. Storage (Documentos)

Crie um bucket `documents` em Storage para armazenar arquivos.

## 6. Autenticacao

A autenticacao via Supabase Auth esta integrada.
Senhas sao gerenciadas pelo Supabase.
