# Configuracion externa de Supabase

Para que los favoritos se guarden en la nube, el proyecto necesita estas variables:

```env
PUBLIC_SUPABASE_URL=URL_DEL_PROYECTO
PUBLIC_SUPABASE_ANON_KEY=ANON_KEY_DEL_PROYECTO
```

En Vercel se cargan en **Project Settings > Environment Variables**.

## Tabla `favorites`

En Supabase, abrir **SQL Editor** y ejecutar:

```sql
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, game_id)
);

alter table public.favorites enable row level security;

create policy "Users can read their own favorites"
on public.favorites
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
on public.favorites
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
on public.favorites
for delete
to authenticated
using (auth.uid() = user_id);
```

## Auth

En **Authentication > URL Configuration**, agregar como URLs permitidas:

- URL local: `http://localhost:4321`
- URL de produccion de Vercel

Para una demo mas simple, se puede desactivar temporalmente la confirmacion por email en
**Authentication > Providers > Email**. Si queda activada, la app igual funciona, pero el usuario
tiene que confirmar el correo antes de iniciar sesion.
