-- Create profiles table
create table if not exists public.profiles (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  role text not null check (role in ('admin', 'manager', 'tenant', 'owner')) default 'tenant',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(user_id)
);

-- Create properties table
create table if not exists public.properties (
  id uuid not null primary key default gen_random_uuid(),
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  bedrooms integer not null,
  bathrooms integer not null,
  area integer not null,
  type text not null check (type in ('apartment', 'house', 'commercial')),
  owner_id uuid not null references public.profiles on delete cascade,
  tenant_id uuid references public.profiles on delete set null,
  monthly_rent integer not null,
  status text not null check (status in ('vacant', 'occupied', 'maintenance')) default 'vacant',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create contracts table
create table if not exists public.contracts (
  id uuid not null primary key default gen_random_uuid(),
  property_id uuid not null references public.properties on delete cascade,
  tenant_id uuid not null references public.profiles on delete cascade,
  owner_id uuid not null references public.profiles on delete cascade,
  start_date date not null,
  end_date date not null,
  monthly_rent integer not null,
  deposit_amount integer not null,
  status text not null check (status in ('active', 'expired', 'terminated')) default 'active',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create payment_installments table
create table if not exists public.payment_installments (
  id uuid not null primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts on delete cascade,
  due_date date not null,
  amount integer not null,
  status text not null check (status in ('pending', 'paid', 'overdue')) default 'pending',
  paid_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create documents table
create table if not exists public.documents (
  id uuid not null primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts on delete cascade,
  name text not null,
  type text not null check (type in ('contract', 'invoice', 'receipt', 'other')),
  file_path text not null,
  uploaded_at timestamp with time zone not null default now(),
  uploaded_by uuid not null references public.profiles on delete set null
);

-- Create site_settings table
create table if not exists public.site_settings (
  id uuid not null primary key default gen_random_uuid(),
  company_name text,
  company_email text,
  company_phone text,
  company_address text,
  company_city text,
  company_state text,
  company_zip_code text,
  website_url text,
  logo_url text,
  color_primary text default '#f97316',
  color_secondary text default '#3f3f46',
  terms_of_service text,
  privacy_policy text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create indexes
create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists properties_owner_id_idx on public.properties(owner_id);
create index if not exists properties_tenant_id_idx on public.properties(tenant_id);
create index if not exists contracts_property_id_idx on public.contracts(property_id);
create index if not exists contracts_tenant_id_idx on public.contracts(tenant_id);
create index if not exists contracts_owner_id_idx on public.contracts(owner_id);
create index if not exists payment_installments_contract_id_idx on public.payment_installments(contract_id);
create index if not exists documents_contract_id_idx on public.documents(contract_id);
